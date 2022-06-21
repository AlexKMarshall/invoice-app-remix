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
    fromAddressLineOne: '19 Union Terrace',
    fromAddressCity: 'London',
    fromAddressPostcode: 'E1 3EZ',
    fromAddressCountry: 'United Kingdom',
    clientName: 'Alex Grim',
    clientEmail: 'alexgrim@mail.com',
    clientAddressLineOne: '23 Lincoln Square',
    clientAddressCity: 'Bradford',
    clientAddressPostcode: 'BD1 9PB',
    clientAddressCountry: 'United Kingdom',
    issuedAt: '2021-08-21',
    paymentTerms: '30',
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
      form.fromAddressLineOne
    )
    await userEvent.type(
      billFromFieldset.getByLabelText(/city/i),
      form.fromAddressCity
    )
    await userEvent.type(
      billFromFieldset.getByLabelText(/post code/i),
      form.fromAddressPostcode
    )
    await userEvent.type(
      billFromFieldset.getByLabelText(/country/i),
      form.fromAddressCountry
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
      form.clientAddressLineOne
    )
    await userEvent.type(
      billToFieldset.getByLabelText(/city/i),
      form.clientAddressCity
    )
    await userEvent.type(
      billToFieldset.getByLabelText(/post code/i),
      form.clientAddressPostcode
    )
    await userEvent.type(
      billToFieldset.getByLabelText(/country/i),
      form.clientAddressCountry
    )

    await userEvent.type(canvas.getByLabelText(/invoice date/i), form.issuedAt)
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
