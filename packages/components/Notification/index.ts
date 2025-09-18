import Notification from './methods'

import { withInstallFunction } from '@xiaozi-element/utils'

export const ErNotification = withInstallFunction(Notification, '$notification')

export * from './types'