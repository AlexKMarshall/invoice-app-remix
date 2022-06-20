import {
  LinkActionWrapper,
  StorybookMockLink,
} from '~/storybook-helpers/mock-link'
import type { Meta, Story } from '@storybook/react'

import { ColorSchemeContainer } from '~/storybook-helpers/color-scheme-container'
import type { ComponentProps } from 'react'
import { NewInvoiceForm } from '.'

type StoryArgs = ComponentProps<typeof NewInvoiceForm> &
  ComponentProps<typeof LinkActionWrapper>

export default {
  title: 'Screens/NewInvoiceForm',
  component: NewInvoiceForm,
  argTypes: {
    onWouldNavigate: { action: true },
  },
  args: {
    Link: StorybookMockLink,
  },
  parameters: {
    layout: 'fullscreen',
    chromatic: { viewports: [320, 420, 850, 1200] },
  },
} as Meta<StoryArgs>

const Template: Story<StoryArgs> = ({ onWouldNavigate, ...args }) => (
  <LinkActionWrapper onWouldNavigate={onWouldNavigate}>
    <ColorSchemeContainer lightMode={<NewInvoiceForm {...args} />} />
  </LinkActionWrapper>
)

export const Default = Template.bind({})
Default.args = {}
