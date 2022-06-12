import { InvoiceSummary, LinkActionWrapper } from '.'
import type { Meta, Story } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'

import { ColorSchemeContainer } from '~/storybook-helpers/color-scheme-container'
import type { ComponentProps } from 'react'
import { expect } from '@storybook/jest'

type StoryArgs = ComponentProps<typeof InvoiceSummary> &
  ComponentProps<typeof LinkActionWrapper>

export default {
  title: 'Molecules/InvoiceSummary',
  component: InvoiceSummary,
  argTypes: {
    onWouldNavigate: { action: true },
  },
  parameters: {
    chromatic: { viewports: [320, 420, 850, 1200] },
  },
} as Meta<StoryArgs>

const Template: Story<StoryArgs> = ({ onWouldNavigate, ...args }) => (
  <LinkActionWrapper onWouldNavigate={onWouldNavigate}>
    <ColorSchemeContainer lightMode={<InvoiceSummary {...args} />} />
  </LinkActionWrapper>
)

export const Default = Template.bind({})
Default.args = {
  id: 'rt3080',
  name: 'Jensen Huang',
  due: new Date('19 Aug 2021'),
  amount: 1800.9,
  currency: 'GBP',
  status: 'paid',
}
Default.play = async ({ args, canvasElement }) => {
  const test = async (mode: 'light-mode' | 'dark-mode') => {
    const canvas = within(await within(canvasElement).findByTestId(mode))
    const link = await canvas.findByRole('link', { name: args.id })

    // click the link directly
    await userEvent.click(link)
    await expect(args.onWouldNavigate).toHaveBeenCalledTimes(1)
    await expect(args.onWouldNavigate).toHaveBeenCalledWith(
      `/invoices/${args.id}`
    )

    // click somehwere else on the invoice
    const name = await canvas.getByText(args.name)
    await userEvent.click(name)
    await expect(args.onWouldNavigate).toHaveBeenCalledTimes(2)
    await expect(args.onWouldNavigate).toHaveBeenLastCalledWith(
      `/invoices/${args.id}`
    )
  }

  await test('light-mode')
}

export const LongContent = Template.bind({})
LongContent.args = {
  id: 'ax1083',
  name: 'Someone With A Very Long Name',
  due: new Date('30 Sep 2022'),
  amount: 1_234_567.89,
  currency: 'GBP',
  status: 'pending',
}
