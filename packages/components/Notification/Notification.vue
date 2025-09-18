<script setup lang="ts">
import type { NotificationProps,NotificationComInstance } from './types';
import { ref, onMounted, computed } from 'vue';
import { delay ,bind } from 'lodash-es';
import { getLastBottomOffset } from './methods';
import { useOffset } from '@xiaozi-element/hooks';
import { typeIconMap, RenderVnode,addUnit } from '@xiaozi-element/utils';
import ErIcon from '../Icon/Icon.vue';

defineOptions({
  name:'ErNotification'
})

const props=withDefaults(defineProps<NotificationProps>(),{
  type:'info',
  duration:3000,
  showClose:true,
  position:'top-right',
  offset:20,
  transitionName:'fade',
})

const visible=ref(false)
const notifyRef=ref<HTMLElement>()
const iconName=computed(()=>{
  return typeIconMap.get(props.type as string) ?? "circle-info"
})

const horizontalClass=computed(()=>{
  return props.position.endsWith('right') ? 'right' : 'left'
})

const verticalProperty=computed(()=>{
  return props.position.startsWith('top') ? 'top' : 'bottom'
})

const boxHeight=ref(0)
const { topOffset, bottomOffset } = useOffset({
  offset: props.offset,
  boxHeight,
  getLastBottomOffset: bind(getLastBottomOffset,props),
})
const customStyle=computed(()=>({
  [verticalProperty.value]:addUnit(topOffset.value),
  zIndex:props.zIndex,
}))

let timer:number

function startTimer(){
  if(props.duration===0) return
  timer = delay(close,props.duration)
}

function clearTimer(){
  clearTimeout(timer)
}

function close(){
  visible.value=false
}

onMounted(()=>{
  visible.value=true
  startTimer()
})

defineExpose<NotificationComInstance>({
  close,
  bottomOffset
})

</script>

<template>
  <transition
    :name="`er-notification-${transitionName}`"
    @after-leave="!visible && onDestory()"
    @enter="boxHeight = notifyRef!.getBoundingClientRect().height"
  >
    <div
      ref="notifyRef"
      class="er-notification"
      :class="{
        [`er-notification--${type}`]: type,
        'show-close': showClose,
        [horizontalClass]:true
      }"
      :style="customStyle"
      v-show="visible"
      role="alert"
      @click="onClick"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <er-icon v-if="iconName" :icon="iconName" class="er-notification__icon" />

      <div class="er-notification__text">
        <div class="er-notification__title">{{ title }}</div>
        <div class="er-notification__content">
          <slot>
            <render-vnode v-if="message" :vNode="message" />
          </slot>
        </div>
      </div>
      <div class="er-notification__close" v-if="showClose">
        <er-icon icon="xmark" @click.stop="close" />
      </div>
    </div>
  </transition>
</template>

<style>
@import './style.css';
</style>