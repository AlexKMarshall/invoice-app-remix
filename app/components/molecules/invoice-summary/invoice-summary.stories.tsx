import { InvoiceSummary, LinkActionWrapper } from '.'
import type { Meta, Story } from '@storybook/react'

import { ColorSchemeContainer } from '~/storybook-helpers/color-scheme-container'
import type { ComponentProps } from 'react'

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

export const LongContent = Template.bind({})
LongContent.args = {
  id: 'ax1083',
  name: 'Someone With A Very Long Name',
  due: new Date('30 Sep 2022'),
  amount: 1_234_567.89,
  currency: 'GBP',
  status: 'pending',
}
