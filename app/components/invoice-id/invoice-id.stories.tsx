import type { ComponentMeta, ComponentStory } from '@storybook/react'

import { ColorSchemeContainer } from '~/storybook-helpers/color-scheme-container'
import { InvoiceId } from '.'

export default {
  title: 'Atoms/InvoiceId',
  component: InvoiceId,
} as ComponentMeta<typeof InvoiceId>

const Template: ComponentStory<typeof InvoiceId> = (args) => (
  <ColorSchemeContainer>
    <InvoiceId {...args} />
  </ColorSchemeContainer>
)

export const Default = Template.bind({})
Default.args = {
  id: 'rt3080',
}
