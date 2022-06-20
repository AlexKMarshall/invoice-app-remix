import {
  FormActionWrapper,
  StorybookMockForm,
} from '~/storybook-helpers/mock-form'
import {
  LinkActionWrapper,
  StorybookMockLink,
} from '~/storybook-helpers/mock-link'
import type { Meta, Story } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'

import { ColorSchemeContainer } from '~/storybook-helpers/color-scheme-container'
import type { ComponentProps } from 'react'
import { NewInvoiceForm } from '.'
import { expect } from '@storybook/jest'

type StoryArgs = ComponentProps<typeof NewInvoiceForm> &
  ComponentProps<typeof LinkActionWrapper> &
  ComponentProps<typeof FormActionWrapper>

export default {
  title: 'Screens/NewInvoiceForm',
  component: NewInvoiceForm,
  argTypes: {
    onWouldNavigate: { action: true },
    onWouldSubmit: { action: true },
  },
  args: {
    Link: StorybookMockLink,
    Form: StorybookMockForm,
  },
  parameters: {
    layout: 'fullscreen',
    chromatic: { viewports: [320, 420, 850, 1200] },
  },
} as Meta<StoryArgs>

const Template: Story<StoryArgs> = ({
  onWouldNavigate,
  onWouldSubmit,
  ...args
}) => (
  <FormActionWrapper onWouldSubmit={onWouldSubmit}>
    <LinkActionWrapper onWouldNavigate={onWouldNavigate}>
      <ColorSchemeContainer lightMode={<NewInvoiceForm {...args} />} />
    </LinkActionWrapper>
  </FormActionWrapper>
)

export const Empty = Template.bind({})
Empty.args = {}

export const Completed = Template.bind({})
Completed.play = async ({ args, canvasElement }) => {
  const form = {
    fromStreetAddress: '19 Union Terrace',
    fromCity: 'London',
    fromPostCode: 'E1 3EZ',
    fromCountry: 'United Kingdom',
    clientName: 'Alex Grim',
    clientEmail: 'alexgrim@mail.com',
    toStreetAddress: '23 Lincoln Square',
    toCity: 'Bradford',
    toPostCode: 'BD1 9PB',
    toCountry: 'United Kingdom',
    invoiceDate: '2021-08-21',
    paymentTerms: 'Net 30 Days',
    projectDescription: 'Graphic Design',
    itemName: 'Banner Design',
    quantity: '1',
    price: '156.00',
    status: 'draft',
  }
  const test = async (mode: 'light-mode' | 'dark-mode') => {
    const canvas = within(within(canvasElement).getByTestId(mode))

    const billFromFieldset = within(
      canvas.getByRole('group', { name: /bill from/i })
    )
    await userEvent.type(
      billFromFieldset.getByLabelText(/street address/i),
      form.fromStreetAddress
    )
    await userEvent.type(
      billFromFieldset.getByLabelText(/city/i),
      form.fromCity
    )
    await userEvent.type(
      billFromFieldset.getByLabelText(/post code/i),
      form.fromPostCode
    )
    await userEvent.type(
      billFromFieldset.getByLabelText(/country/i),
      form.fromCountry
    )

    const billToFieldset = within(
      canvas.getByRole('group', { name: /bill to/i })
    )
    await userEvent.type(
      billToFieldset.getByLabelText(/client's name/i),
      form.clientName
    )
    await userEvent.type(
      billToFieldset.getByLabelText(/client's email/i),
      form.clientEmail
    )
    await userEvent.type(
      billToFieldset.getByLabelText(/street address/i),
      form.toStreetAddress
    )
    await userEvent.type(billToFieldset.getByLabelText(/city/i), form.toCity)
    await userEvent.type(
      billToFieldset.getByLabelText(/post code/i),
      form.toPostCode
    )
    await userEvent.type(
      billToFieldset.getByLabelText(/country/i),
      form.toCountry
    )

    await userEvent.type(
      canvas.getByLabelText(/invoice date/i),
      form.invoiceDate
    )
    await userEvent.type(
      canvas.getByLabelText(/payment terms/i),
      form.paymentTerms
    )
    await userEvent.type(
      canvas.getByLabelText(/project description/i),
      form.projectDescription
    )

    await userEvent.type(canvas.getByLabelText(/item name/i), form.itemName)
    await userEvent.type(canvas.getByLabelText(/quantity/i), form.quantity)
    await userEvent.type(canvas.getByLabelText(/price/i), form.price)

    await userEvent.click(
      canvas.getByRole('button', { name: /save as draft/i })
    )

    // @ts-ignore
    const lastCalledFormData = args.onWouldSubmit.mock.lastCall[0].payload
      .formData as FormData

    await expect(
      Object.fromEntries(lastCalledFormData.entries())
    ).toMatchObject(form)
  }

  await test('light-mode')
  await test('dark-mode')
}
