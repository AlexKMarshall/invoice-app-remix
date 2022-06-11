import type { ComponentMeta, ComponentStory } from '@storybook/react'

import { StatusBadge } from '.'

export default {
  title: 'Atoms/StatusBadge',
  component: StatusBadge,
} as ComponentMeta<typeof StatusBadge>

const Template: ComponentStory<typeof StatusBadge> = (args) => (
  <StatusBadge {...args} />
)

export const Paid = Template.bind({})
Paid.args = {
  status: 'paid',
}
export const Pending = Template.bind({})
Pending.args = {
  status: 'pending',
}
export const Draft = Template.bind({})
Draft.args = {
  status: 'draft',
}
