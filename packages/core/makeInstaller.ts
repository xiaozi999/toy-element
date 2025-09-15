import {each} from 'lodash-es'
import type {Plugin, App} from 'vue'
import {provideGlobalConfig,type ConfigProviderProps} from '@xiaozi-element/components'

export function makeInstaller(component:Plugin[]){
  const installer=(app:App,opts?:ConfigProviderProps)=>{
    each(component, (c)=>app.use(c))
    if(opts) provideGlobalConfig(opts,app,true)
  }
  return installer as Plugin
}

export default makeInstaller