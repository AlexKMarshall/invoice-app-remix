import type { ComponentMeta, ComponentStory } from '@storybook/react'

import { ColorSchemeContainer } from '~/storybook-helpers/color-scheme-container'
import { Header as HeaderComponent } from '.'

export default {
  title: 'Molecules/Header',
  component: HeaderComponent,
  parameters: {
    layout: 'fullscreen',
    chromatic: { viewports: [320, 850, 1200] },
  },
} as ComponentMeta<typeof HeaderComponent>

const Template: ComponentStory<typeof HeaderComponent> = (args) => (
  <ColorSchemeContainer
    layout="fullwidth"
    lightMode={
      <div className="flex flex-col lg:flex-row">
        <HeaderComponent {...args} />
        <div className="flex-grow" />
      </div>
    }
    darkMode={
      <div className="flex flex-col lg:flex-row">
        <HeaderComponent {...args} as="div" />
        <div className="flex-grow" />
      </div>
    }
  />
)

export const Header = Template.bind({})
