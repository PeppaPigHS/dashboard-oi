import React from 'react'
import App from 'next/app'
import Head from 'next/head'

import { Global, css } from '@emotion/core'
import { CSSReset, ThemeProvider, theme, DefaultTheme } from '@chakra-ui/core'

import { PageLayout } from 'components/Layout'

export default class CustomApp extends App {
  public render() {
    const { Component, pageProps } = this.props
    const customTheme: DefaultTheme = {
      ...theme,
      fonts: {
        ...theme.fonts,
        body:
          "'Helvetica Neue', 'Segoe UI', 'Helvetica', Kanit, system-ui, sans-serif",
        heading:
          "'Helvetica Neue', 'Segoe UI', 'Helvetica', Kanit, system-ui, sans-serif",
      },
    }
    return (
      <ThemeProvider theme={customTheme}>
        <Head>
          <title>DashboardOI</title>
        </Head>
        <CSSReset />
        <Global
          styles={css`
            html,
            body,
            #__next {
              height: 100%;
              margin: 0;
            }
          `}
        />
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
      </ThemeProvider>
    )
  }
}
