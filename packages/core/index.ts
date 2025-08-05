import { makeInstaller } from '@toy-element/utils'
import components from './components'
import { fas } from '@fortawesome/free-solid-svg-icons'
import '@toy-element/theme/index.css'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(fas)
const installer = makeInstaller(components)

export * from '@toy-element/components'
export default installer 