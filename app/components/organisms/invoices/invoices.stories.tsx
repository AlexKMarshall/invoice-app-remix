import {
  LinkActionWrapper,
  StorybookMockLink,
} from '~/storybook-helpers/mock-link'
import type { Meta, Story } from '@storybook/react'

import { ColorSchemeContainer } from '~/storybook-helpers/color-scheme-container'
import type { ComponentProps } from 'react'
import { Invoices } from '.'

type StoryArgs = ComponentProps<typeof Invoices> &
  ComponentProps<typeof LinkActionWrapper>

export default {
  title: 'Organisms/Invoices',
  component: Invoices,
  argTypes: {
    onWouldNavigate: { action: true },
  },
  args: {
    Link: StorybookMockLink,
  },
  parameters: {
    chromatic: { viewports: [320, 420, 850, 1200] },
  },
} as Meta<StoryArgs>

const Template: Story<StoryArgs> = ({ onWouldNavigate, ...args }) => (
  <LinkActionWrapper onWouldNavigate={onWouldNavigate}>
    <ColorSchemeContainer lightMode={<Invoices {...args} />} />
  </LinkActionWrapper>
)

export const Default = Template.bind({})
Default.args = {
  invoices: [
    {
      id: 'rt3080',
      customerName: 'Jensen Huang',
      due: new Date('19 Aug 2021'),
      totalAmount: 1800.9,
      currency: 'GBP',
      status: 'paid',
    },
    {
      id: 'xm9141',
      customerName: 'Alex Grim',
      due: new Date('20 Sep 2021'),
      totalAmount: 556,
      currency: 'GBP',
      status: 'pending',
    },
    {
      id: 'rg0314',
      customerName: 'Alex Grim',
      due: new Date('01 Oct 2021'),
      totalAmount: 14002.33,
      currency: 'GBP',
      status: 'paid',
    },
    {
      id: 'uv2353',
      customerName: 'Anita Wainwright',
      due: new Date('12 Nov 2021'),
      totalAmount: 3102.04,
      currency: 'GBP',
      status: 'draft',
    },
  ],
}
