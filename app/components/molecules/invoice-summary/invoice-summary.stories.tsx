import type { ComponentMeta, ComponentStory } from '@storybook/react'

import { ColorSchemeContainer } from '~/storybook-helpers/color-scheme-container'
import { InvoiceSummary } from '.'

export default {
  title: 'Molecules/InvoiceSummary',
  component: InvoiceSummary,
  parameters: {
    chromatic: { viewports: [320, 420, 850, 1200] },
  },
} as ComponentMeta<typeof InvoiceSummary>

const Template: ComponentStory<typeof InvoiceSummary> = (args) => (
  <ColorSchemeContainer lightMode={<InvoiceSummary {...args} />} />
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
