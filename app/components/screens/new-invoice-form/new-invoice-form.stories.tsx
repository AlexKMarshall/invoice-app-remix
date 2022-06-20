import {
  FormActionWrapper,
  StorybookMockForm,
} from '~/storybook-helpers/mock-form'
import {
  LinkActionWrapper,
  StorybookMockLink,
} from '~/storybook-helpers/mock-link'
import type { Meta, Story } from '@storybook/react'

import { ColorSchemeContainer } from '~/storybook-helpers/color-scheme-container'
import type { ComponentProps } from 'react'
import { NewInvoiceForm } from '.'

type StoryArgs = ComponentProps<typeof NewInvoiceForm> &
  ComponentProps<typeof LinkActionWrapper> &
  ComponentProps<typeof FormActionWrapper>

export default {
  title: 'Screens/NewInvoiceForm',
  component: NewInvoiceForm,
  argTypes: {
    onWouldNavigate: { action: true },
    onWouldSubmit: { action: true },
  },
  args: {
    Link: StorybookMockLink,
    Form: StorybookMockForm,
  },
  parameters: {
    layout: 'fullscreen',
    chromatic: { viewports: [320, 420, 850, 1200] },
  },
} as Meta<StoryArgs>

const Template: Story<StoryArgs> = ({
  onWouldNavigate,
  onWouldSubmit,
  ...args
}) => (
  <FormActionWrapper onWouldSubmit={onWouldSubmit}>
    <LinkActionWrapper onWouldNavigate={onWouldNavigate}>
      <ColorSchemeContainer lightMode={<NewInvoiceForm {...args} />} />
    </LinkActionWrapper>
  </FormActionWrapper>
)

export const Default = Template.bind({})
Default.args = {}
