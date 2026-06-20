import '@payloadcms/next/css'

import { RootLayout } from '@payloadcms/next/layouts'
import config from '@payload-config'
import type { SanitizedConfig } from 'payload'
import React from 'react'

import { handleServerFunctions } from './actions'
import { importMap } from './admin/importMap'

type Args = {
  children: React.ReactNode
}

const Layout = ({ children }: Args) =>
  RootLayout({
    children,
    config: config as unknown as Promise<SanitizedConfig>,
    importMap,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    serverFunction: handleServerFunctions as any,
  })

export default Layout
