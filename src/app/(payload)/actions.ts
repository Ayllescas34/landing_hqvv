'use server'

import { handleServerFunctions as _handleServerFunctions } from '@payloadcms/next/layouts'
import config from '@payload-config'
import type { SanitizedConfig } from 'payload'

import { importMap } from './admin/importMap'

type ServerFunctionArgs = Parameters<typeof _handleServerFunctions>[0]

export async function handleServerFunctions(args: ServerFunctionArgs) {
  return _handleServerFunctions({
    ...args,
    config: config as unknown as Promise<SanitizedConfig>,
    importMap,
  })
}
