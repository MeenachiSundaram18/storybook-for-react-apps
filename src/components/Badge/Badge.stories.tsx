import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Badge } from './Badge'

export default {
  title: 'components/badge',
  component: Badge,
  parameters: {
    design: {
      type: 'figspec',
      url: 'https://www.figma.com/file/3Q1HTCalD0lJnNvcMoEw1x/Mealdrop?node-id=1906%3A3469',
    },
  },
} as ComponentMeta<typeof Badge>

const Template: ComponentStory<typeof Badge> = (args) => <Badge {...args} />

export const Default = Template.bind({})
Default.args = {
  text: 'breakfast food',
}
