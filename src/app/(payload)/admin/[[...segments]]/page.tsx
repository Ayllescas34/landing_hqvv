/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import config from '@payload-config'
import type { SanitizedConfig } from 'payload'

import { importMap } from '../importMap'

export const dynamic = 'force-dynamic'

type PageProps = {
  params: Promise<{ segments?: string[] }>
  searchParams: Promise<Record<string, string | string[]>>
}

const configAsPromise = config as unknown as Promise<SanitizedConfig>

export function generateMetadata(props: PageProps) {
  return generatePageMetadata({ config: configAsPromise, ...props })
}

export default function Page(props: PageProps) {
  return RootPage({ config: configAsPromise, importMap, ...props } as any)
}
