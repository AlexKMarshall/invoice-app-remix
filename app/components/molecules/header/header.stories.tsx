import type { ComponentMeta, ComponentStory } from '@storybook/react'

import { ColorSchemeContainer } from '~/storybook-helpers/color-scheme-container'
import { Header as HeaderComponent } from '.'

export default {
  title: 'Molecules/Header',
  component: HeaderComponent,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof HeaderComponent>

const Template: ComponentStory<typeof HeaderComponent> = (args) => (
  <ColorSchemeContainer
    layout="fullwidth"
    lightMode={
      <div className="flex flex-col lg:flex-row">
        <HeaderComponent {...args} />
        <main className="flex-grow" />
      </div>
    }
  />
)

export const Header = Template.bind({})
