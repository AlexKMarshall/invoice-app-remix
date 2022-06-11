import type { ComponentMeta, ComponentStory } from '@storybook/react'

import { StatusBadge } from '.'

export default {
  title: 'Atoms/StatusBadge',
  component: StatusBadge,
} as ComponentMeta<typeof StatusBadge>

const Template: ComponentStory<typeof StatusBadge> = (args) => (
  <div className="space-y-6">
    <div className="p-4 space-y-4 rounded bg-slate-50">
      <h2 className="text-lg font-bold">Light Mode</h2>
      <StatusBadge {...args} />
    </div>
    <div className="p-4 space-y-4 rounded dark bg-slate-900">
      <h2 className="text-lg font-bold text-white">Dark Mode</h2>
      <StatusBadge {...args} />
    </div>
  </div>
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
