import { makeInstaller } from '@xiaozi-element/utils'
import components from './components'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import printLogo from './printLogo'
import '@xiaozi-element/theme/index.css'

printLogo()

library.add(fas)
const installer = makeInstaller(components)

export * from '@xiaozi-element/components'
export default installer 