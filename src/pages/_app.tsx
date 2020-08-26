import React from 'react'
import App from 'next/app'
import Head from 'next/head'

import UserProvider from 'components/UserContext'

import 'styles/tailwind.css'

export default class CustomApp extends App {
  public render() {
    const { Component, pageProps } = this.props

    return (
      <React.Fragment>
        <Head>
          <title>DashboardOI</title>
        </Head>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </React.Fragment>
    )
  }
}
