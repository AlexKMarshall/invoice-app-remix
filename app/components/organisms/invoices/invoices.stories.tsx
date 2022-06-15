import {
  LinkActionWrapper,
  StorybookMockLink,
} from '~/storybook-helpers/mock-link'
import type { Meta, Story } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'

import { ColorSchemeContainer } from '~/storybook-helpers/color-scheme-container'
import type { ComponentProps } from 'react'
import { Invoices } from '.'
import { expect } from '@storybook/jest'

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
      name: 'Jensen Huang',
      due: new Date('19 Aug 2021'),
      amount: 1800.9,
      currency: 'GBP',
      status: 'paid',
    },
    {
      id: 'xm9141',
      name: 'Alex Grim',
      due: new Date('20 Sep 2021'),
      amount: 556,
      currency: 'GBP',
      status: 'pending',
    },
    {
      id: 'rg0314',
      name: 'Alex Grim',
      due: new Date('01 Oct 2021'),
      amount: 14002.33,
      currency: 'GBP',
      status: 'paid',
    },
    {
      id: 'uv2353',
      name: 'Anita Wainwright',
      due: new Date('12 Nov 2021'),
      amount: 3102.04,
      currency: 'GBP',
      status: 'draft',
    },
  ],
}
