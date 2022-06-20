import type { ComponentMeta, ComponentStory } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'

import { ColorSchemeContainer } from '~/storybook-helpers/color-scheme-container'
import { Input } from '.'
import { expect } from '@storybook/jest'

export default {
  title: 'Atoms/Input',
  component: Input,
  args: {
    label: 'Street address',
    placeholder: 'Your address here',
  },
  argTypes: {
    onChange: { action: true },
    onBlur: { action: true },
  },
} as ComponentMeta<typeof Input>

const Template: ComponentStory<typeof Input> = ({ id, ...args }) => (
  <ColorSchemeContainer lightMode={<Input {...args} />} />
)

export const Filled = Template.bind({})
Filled.parameters = {
  chromatic: { viewports: [320, 1200] },
}
Filled.play = async ({ args, canvasElement }) => {
  const test = async (mode: 'light-mode' | 'dark-mode') => {
    const canvas = within(within(canvasElement).getByTestId(mode))
    const input = canvas.getByRole('textbox', { name: args.label })

    await userEvent.type(input, '234 High Street')

    // @ts-ignore
    await expect(input).toHaveValue('234 High Street')
  }
  await test('light-mode')
  await test('dark-mode')
}

export const WithErrorMessage = Template.bind({})
WithErrorMessage.args = {
  errorMessage: "Street address can't be empty",
}
WithErrorMessage.parameters = {
  chromatic: { viewports: [320, 1200] },
}
WithErrorMessage.play = async ({ args, canvasElement }) => {
  const test = async (mode: 'light-mode' | 'dark-mode') => {
    const canvas = within(within(canvasElement).getByTestId(mode))
    const input = canvas.getByRole('textbox', { name: args.label })

    // @ts-ignore
    await expect(input).toBeInvalid()
    // @ts-ignore
    await expect(input).toHaveErrorMessage(args.errorMessage)
  }

  await test('light-mode')
}

export const WithPlaceholder = Template.bind({})
WithPlaceholder.args = { defaultValue: '' }

export const Disabled = Template.bind({})
Disabled.args = { value: '321 Fixed Avenue', disabled: true }
