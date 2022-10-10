import React from 'react'
import { ThemeProvider } from 'styled-components'
import { DecoratorFn } from '@storybook/react'
import { GlobalStyle } from '../src/styles/GlobalStyle'
import { darkTheme, lightTheme } from '../src/styles/theme'
import { withDesign } from 'storybook-addon-designs'
import { BrowserRouter } from 'react-router-dom'
import { initialize, mswDecorator } from 'msw-storybook-addon'
import { Provider as StoreProvider } from 'react-redux'
import { store } from '../src/app-state'

// Second param gives all of the details check below docs
// please view documentation => https://storybook.js.org/docs/react/essentials/toolbars-and-globals#global-types-and-the-toolbar-annotation

// msw mocker
initialize()

const withTheme: DecoratorFn = (StoryFn, context) => {
  const theme = context.globals.theme
  // use the global theme value to decide which theme to render
  const storyTheme = theme === 'dark' ? darkTheme : lightTheme
  return (
    <ThemeProvider theme={storyTheme}>
      <GlobalStyle />
      <StoryFn />
    </ThemeProvider>
  )
}

export const withRouter: DecoratorFn = (StoryFn) => (
  <BrowserRouter>
    <StoryFn />
  </BrowserRouter>
)

export const withStore: DecoratorFn = (StoryFn) => {
  return (
    <StoreProvider store={store}>
      <StoryFn />
    </StoreProvider>
  )
}


export const globalDecorators = [
  mswDecorator,
  withTheme,
  withDesign,
  withRouter,
  withStore
]
