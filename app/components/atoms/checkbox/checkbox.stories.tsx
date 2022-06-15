import type { ComponentMeta, ComponentStory } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'

import { Checkbox } from '.'
import { ColorSchemeContainer } from '~/storybook-helpers/color-scheme-container'
import { expect } from '@storybook/jest'

export default {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  args: {
    label: 'Check me',
  },
} as ComponentMeta<typeof Checkbox>

const Template: ComponentStory<typeof Checkbox> = (args) => (
  <ColorSchemeContainer lightMode={<Checkbox {...args} />} />
)

export const Unchecked = Template.bind({})

export const Checked = Template.bind({})
Checked.play = async ({ args, canvasElement }) => {
  const test = async (mode: 'light-mode' | 'dark-mode') => {
    const canvas = within(within(canvasElement).getByTestId(mode))
    const checkbox = canvas.getByRole('checkbox', { name: args.label })

    await userEvent.click(checkbox)

    // @ts-ignore
    await expect(checkbox).toBeChecked()
  }

  await test('light-mode')
  await test('dark-mode')
}
