import type { ComponentMeta, ComponentStory } from '@storybook/react'

import { Button } from '.'
import { ColorSchemeContainer } from '~/storybook-helpers/color-scheme-container'

export default {
  title: 'Atoms/Button',
  component: Button,
  args: {
    children: 'Click me',
  },
  argTypes: {
    onClick: { action: true },
  },
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => (
  <ColorSchemeContainer>
    <Button {...args} />
  </ColorSchemeContainer>
)

export const Primary = Template.bind({})
Primary.args = {
  color: 'primary',
}

export const Secondary = Template.bind({})
Secondary.args = {
  color: 'secondary',
}

export const Monochrome = Template.bind({})
Monochrome.args = {
  color: 'monochrome',
}
