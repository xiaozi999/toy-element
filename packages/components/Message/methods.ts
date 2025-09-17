import { isVNode,render,h,shallowReactive } from "vue";  
import { isString,findIndex,get,set,each} from "lodash-es";
import MessageConstructor from "./Message.vue";
import { useId, useZIndex } from "@xiaozi-element/hooks";
import {
  type CreateMessageProps,
  type MessageInstance,
  type MessageFn,
  type Message,
  type MessageParams,
  type MessageHandler,
  type MessageProps,
  type MessageType,
  messageTypes,
} from "./types";
const instances:MessageInstance[]=shallowReactive([])
const { nextZIndex } = useZIndex()
export const messageDefault={
  type:"info",
  duration:3000,
  offset:20,
  transitionName:"fade-up",
}

const normalizedOptions=(opts:MessageParams):CreateMessageProps=>{
  const result = !opts || isVNode(opts) || isString(opts)
    ? {
      message:opts,
    }:opts 
  return {...messageDefault,...result} as CreateMessageProps
}

const createMessage=(props:CreateMessageProps):MessageInstance=>{
  const id = useId().value
  const container = document.createElement('div')

  const destory=()=>{
    const idx=findIndex(instances,{id})
    if(idx===-1) return 
    instances.splice(idx,1)
    render(null,container)
  }

  const _props:MessageProps = {
    ...props,
    id,
    zIndex:nextZIndex(),
    onDestory:destory,
  }
  const vnode = h(MessageConstructor, _props)

  render(vnode,container)

  document.body.appendChild(container.firstElementChild!)

  const vm=vnode.component!
  const handler:MessageHandler={
    close:()=>{
      vm.exposed!.close()
    }
  }

  const instance:MessageInstance={
    id,
    vnode,
    props: _props,
    vm,
    handler,
  }

  instances.push(instance)

  return instance
}

export function getLastBottomOffset(this:MessageProps){
  const idx=findIndex(instances,{id:this.id})
  if(idx<=0) return 0

  return get(instances,[idx-1,'vm','exposed','bottomOffset','value'])
}

export const message:MessageFn & Partial<Message> = (options={})=>{
  const normalized = normalizedOptions(options)
  const instance = createMessage(normalized)

  return instance.handler
}

export function closeAll(type?:MessageType){
  each(instances,(instance)=>{
    if(type){
      instance.props.type===type && instance.handler.close()
      return 
    }
    instance.handler.close()
  })
}
each(messageTypes,(type)=>{
  set(message,type,(opts:MessageParams)=>{
    const normalized = normalizedOptions(opts)
    return message({...normalized,type})
  })
})

message.closeAll=closeAll

export default message as Message
