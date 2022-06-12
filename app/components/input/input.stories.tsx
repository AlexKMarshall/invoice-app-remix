import type { ComponentMeta, ComponentStory } from '@storybook/react'

import { ColorSchemeContainer } from '~/storybook-helpers/color-scheme-container'
import { Input } from '.'

export default {
  title: 'Atoms/Input',
  component: Input,
  args: {
    id: 'input-field',
    label: 'Street address',
    defaultValue: '123 Main Street',
  },
} as ComponentMeta<typeof Input>

const Template: ComponentStory<typeof Input> = ({ id, ...args }) => (
  <ColorSchemeContainer
    lightMode={<Input id={`${id}-light`} {...args} />}
    darkMode={<Input id={`${id}-dark`} {...args} />}
  />
)

export const Default = Template.bind({})

export const Empty = Template.bind({})
Empty.args = { defaultValue: '' }

export const ReadOnly = Template.bind({})
ReadOnly.args = { readOnly: true }
ReadOnly.parameters = {
  a11y: {
    config: {
      rules: [
        {
          // @fixme color contrast of read only fields fails
          id: 'color-contrast',
          reviewOnFail: true,
        },
      ],
    },
  },
}
