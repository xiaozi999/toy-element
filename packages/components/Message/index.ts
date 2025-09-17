import Message from './methods'

import { withInstallFunction } from '@xiaozi-element/utils'

export const ErMessage = withInstallFunction(Message, '$message')

export * from './types'