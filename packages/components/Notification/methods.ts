import type {
  CreateNotificationProps,
  NotificationInstance,
  NotificationFn,
  Notification,
  NotificationParams,
  NotificationHandler,
  NotificationProps,
  NotificationType,
} from "./types";
import { notificationTypes, notificationPosition } from "./types";
import { shallowReactive, isVNode, render, h } from "vue";
import { each, findIndex, isString, set, get } from "lodash-es";
import { useZIndex, useId } from "@xiaozi-element/hooks";
import NotificationConstructor from "./Notification.vue"

const { nextZIndex } = useZIndex();

// const instances:NotificationInstance[]=shallowReactive([])
const instancesMap:Map<
NotificationProps['position'],
NotificationInstance[]
> = new Map()
each(notificationPosition,(position)=>{
  instancesMap.set(position,shallowReactive([]))
})

export const notificationDefaults = {
  type: "info",
  position: "top-right",
  duration: 3000,
  offset: 20,
  transitionName: "fade",
  showClose: true,
} as const;

const normalizedOptions=(opts:NotificationParams):CreateNotificationProps=>{
  const result = !opts || isVNode(opts) || isString(opts)
    ? {
      message:opts,
    }:opts 
  return {...notificationDefaults,...result} as CreateNotificationProps
}

const getInstancesByPosition=(position:NotificationProps['position']):NotificationInstance[]=>{
  return instancesMap.get(position)!
}

const createNotification=(props:CreateNotificationProps):NotificationInstance=>{
  const id = useId().value
  const container = document.createElement('div')
  const instances = getInstancesByPosition(props.position || 'top-right')

  const destory=()=>{
    const idx=findIndex(instances,{id})
    if(idx===-1) return 
    instances.splice(idx,1)
    render(null,container)
  }

  const _props:NotificationProps = {
    ...props,
    id,
    zIndex:nextZIndex(),
    onDestory:destory,
  }
  const vnode = h(NotificationConstructor, _props)

  render(vnode,container)

  document.body.appendChild(container.firstElementChild!)

  const vm=vnode.component!
  const handler:NotificationHandler={
    close:()=>{
      vm.exposed!.close()
    }
  }

  const instance:NotificationInstance={
    id,
    vnode,
    props: _props,
    vm,
    handler,
  }

  instances.push(instance)

  return instance
}


export function getLastBottomOffset(this:NotificationProps){
  const instances = getInstancesByPosition(this.position || 'top-right')
  const idx=findIndex(instances,{id:this.id})
  if(idx<=0) return 0

  return get(instances,[idx-1,'vm','exposed','bottomOffset','value'])
}

export const notification:NotificationFn & Partial<Notification> = (options={})=>{
  const normalized = normalizedOptions(options)
  const instance = createNotification(normalized)

  return instance.handler
}


export function closeAll(type?:NotificationType){
  instancesMap.forEach((instances)=>{
    each(instances,(instance)=>{
      if(type){
        instance.props.type===type && instance.handler.close()
        return 
      }
      instance.handler.close()
    })
  })
}
each(notificationTypes,(type)=>{
  set(notification,type,(opts:NotificationParams)=>{
    const normalized = normalizedOptions(opts)
    return notification({...normalized,type})
  })
})

notification.closeAll=closeAll

export default notification as Notification