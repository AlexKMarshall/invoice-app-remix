import {
  LinkActionWrapper,
  StorybookMockLink,
} from '~/storybook-helpers/mock-link'
import type { Meta, Story } from '@storybook/react'

import { ColorSchemeContainer } from '~/storybook-helpers/color-scheme-container'
import type { ComponentProps } from 'react'
import { InvoiceList } from '.'

type StoryArgs = ComponentProps<typeof InvoiceList> &
  ComponentProps<typeof LinkActionWrapper>

export default {
  title: 'Screens/Invoice-List',
  component: InvoiceList,
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
    <ColorSchemeContainer lightMode={<InvoiceList {...args} />} />
  </LinkActionWrapper>
)

export const Default = Template.bind({})
Default.args = {
  items: [
    {
      id: 'rt3080',
      clientName: 'Jensen Huang',
      dueAt: new Date('19 Aug 2021'),
      totalAmount: 1800.9,
      currency: 'GBP',
      status: 'paid',
    },
    {
      id: 'xm9141',
      clientName: 'Alex Grim',
      dueAt: new Date('20 Sep 2021'),
      totalAmount: 556,
      currency: 'GBP',
      status: 'pending',
    },
    {
      id: 'rg0314',
      clientName: 'Alex Grim',
      dueAt: new Date('01 Oct 2021'),
      totalAmount: 14002.33,
      currency: 'GBP',
      status: 'paid',
    },
    {
      id: 'uv2353',
      clientName: 'Anita Wainwright',
      dueAt: new Date('12 Nov 2021'),
      totalAmount: 3102.04,
      currency: 'GBP',
      status: 'draft',
    },
  ],
}
