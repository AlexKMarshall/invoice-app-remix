import type { ComponentMeta, ComponentStory } from '@storybook/react'

import { ColorSchemeContainer } from '~/storybook-helpers/color-scheme-container'
import { Input } from '.'

export default {
  title: 'Atoms/Input',
  component: Input,
  args: { id: 'input-field', label: 'Street address' },
} as ComponentMeta<typeof Input>

const Template: ComponentStory<typeof Input> = ({ id, ...args }) => (
  <ColorSchemeContainer
    lightMode={<Input id={`${id}-light`} {...args} />}
    darkMode={<Input id={`${id}-dark`} {...args} />}
  />
)

export const Default = Template.bind({})
Default.args = {}
