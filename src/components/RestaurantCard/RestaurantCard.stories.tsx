import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import { restaurants } from '../../stub/restaurants'

// change below import to basic, unstyled and final version to see composed way
import { RestaurantCard } from './RestaurantCard'

export default {
  title: 'Components/RestaurantCard',
  component: RestaurantCard,
  argTypes: {
    rating: {
      control: {
        type: 'range',
        min: 0,
        max: 5,
        step: 0.1,
      },
    },
  },
  parameters: {
    design: {
      type: 'figspec',
      url: 'https://www.figma.com/file/3Q1HTCalD0lJnNvcMoEw1x/Mealdrop?node-id=1126%3A3893',
    },
  },
} as ComponentMeta<typeof RestaurantCard>

const Template: ComponentStory<typeof RestaurantCard> = (args) => <RestaurantCard {...args} />

export const Default = Template.bind({})
Default.args = {
  ...restaurants[0],
}
Default.play = async ({ canvasElement, args }) => {
  // get a canvas from canvasElement which can be used to query elements from within
  const canvas = within(canvasElement)
  // click on the restaurant card
  await userEvent.click(canvas.getByTestId('restaurant-card'))
  // assert that the onClick spy was called
  await expect(args.onClick).toHaveBeenCalled()
}

// every below templates reusing args from Default story
export const New = Template.bind({})
New.args = {
  ...Default.args,
  isNew: true,
}

export const Closed = Template.bind({})
Closed.args = {
  ...Default.args,
  isClosed: true,
}
Closed.play = async ({ canvasElement, args }) => {
  const canvas = within(canvasElement)
  await userEvent.click(canvas.getByTestId('restaurant-card'))
  // this should fail because onClick should not be called
  await expect(args.onClick).not.toHaveBeenCalled()
}

export const Loading = Template.bind({})
Loading.args = {
  ...Default.args,
  isLoading: true,
}
