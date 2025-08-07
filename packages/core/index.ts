import { makeInstaller } from '@xiaozi-element/utils'
import components from './components'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import '@xiaozi-element/theme/index.css'

library.add(fas)
const installer = makeInstaller(components)

export * from '../components'
export default installer 