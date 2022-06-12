import type { ComponentMeta, ComponentStory } from '@storybook/react'

import { ColorSchemeContainer } from '~/storybook-helpers/color-scheme-container'
import { InvoiceId as InvoiceIdComponent } from '.'

export default {
  title: 'Atoms/InvoiceId',
  component: InvoiceIdComponent,
} as ComponentMeta<typeof InvoiceIdComponent>

const Template: ComponentStory<typeof InvoiceIdComponent> = (args) => (
  <ColorSchemeContainer lightMode={<InvoiceIdComponent {...args} />} />
)

export const InvoiceId = Template.bind({})
InvoiceId.args = {
  id: 'rt3080',
}
