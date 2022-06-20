import {
  LinkActionWrapper,
  StorybookMockLink,
} from '~/storybook-helpers/mock-link'
import type { Meta, Story } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'

import { ColorSchemeContainer } from '~/storybook-helpers/color-scheme-container'
import type { ComponentProps } from 'react'
import { InvoiceListItem } from '.'
import { expect } from '@storybook/jest'

type StoryArgs = ComponentProps<typeof InvoiceListItem> &
  ComponentProps<typeof LinkActionWrapper>

export default {
  title: 'Molecules/InvoiceListItem',
  component: InvoiceListItem,
  argTypes: {
    onWouldNavigate: { action: true },
  },
  args: {
    Link: StorybookMockLink,
  },
  parameters: {
    chromatic: { viewports: [320, 420, 850, 1200] },
  },
} as Meta<StoryArgs>

const Template: Story<StoryArgs> = ({ onWouldNavigate, ...args }) => (
  <LinkActionWrapper onWouldNavigate={onWouldNavigate}>
    <ColorSchemeContainer lightMode={<InvoiceListItem {...args} />} />
  </LinkActionWrapper>
)

export const Default = Template.bind({})
Default.args = {
  id: 'rt3080',
  clientName: 'Jensen Huang',
  dueAt: new Date('19 Aug 2021'),
  totalAmount: 1800.9,
  currency: 'GBP',
  status: 'paid',
}
Default.play = async ({ args, canvasElement }) => {
  const test = async (mode: 'light-mode' | 'dark-mode') => {
    const canvas = within(within(canvasElement).getByTestId(mode))
    const link = canvas.getByRole('link', { name: args.id })

    const expectedNavigateTo = `/invoices/${args.id}`

    // click the link directly
    await userEvent.click(link)
    await expect(args.onWouldNavigate).toHaveBeenCalledTimes(1)
    await expect(args.onWouldNavigate).toHaveBeenCalledWith(
      expect.objectContaining({ to: expectedNavigateTo })
    )

    // click somehwere else on the invoice
    const name = await canvas.getByText(args.clientName)
    await userEvent.click(name)
    await expect(args.onWouldNavigate).toHaveBeenCalledTimes(2)
    await expect(args.onWouldNavigate).toHaveBeenLastCalledWith(
      expect.objectContaining({ to: expectedNavigateTo })
    )
  }

  await test('light-mode')
}

export const LongContent = Template.bind({})
LongContent.args = {
  id: 'ax1083',
  clientName: 'Someone With A Very Long Name',
  dueAt: new Date('30 Sep 2022'),
  totalAmount: 1_234_567.89,
  currency: 'GBP',
  status: 'pending',
}
