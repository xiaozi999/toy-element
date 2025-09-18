<script setup lang="ts">
import type { MessageProps, MessageComInstance } from './types';
import { ref, onMounted, computed,watch } from 'vue';
import { delay ,bind } from 'lodash-es';
import { getLastBottomOffset } from './methods';
import { useOffset,useEventListener } from '@xiaozi-element/hooks';
import { typeIconMap, RenderVnode,addUnit } from '@xiaozi-element/utils';
import ErIcon from '../Icon/Icon.vue';

defineOptions({
  name:'ErMessage'
})

const props =withDefaults(defineProps<MessageProps>(),{
  duration:3000,
  type:'info',
  offset:20,
  transitionName:'fade-up',
})

const visible=ref(false)
const messageRef=ref<HTMLElement>()
const iconName=computed(()=>{
  return typeIconMap.get(props.type as string) ?? "circle-info"
})
const boxHeight=ref(0)
const { topOffset, bottomOffset } = useOffset({
  offset: props.offset,
  boxHeight,
  getLastBottomOffset: bind(getLastBottomOffset,props),
})
const customStyle=computed(()=>({
  top:addUnit(topOffset.value),
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

watch(visible,(val)=>{
  if(!val) boxHeight.value=-props.offset
})

useEventListener(document,'keydown',(e:Event)=>{
  const {code}=e as KeyboardEvent
  if(code==='Escape') close()
})

onMounted(()=>{
  visible.value=true
  startTimer()
})

defineExpose<MessageComInstance>({
  close,
  bottomOffset
})



</script>

<template>
  <Transition
    :name="transitionName"
    @enter="boxHeight = messageRef!.getBoundingClientRect().height"
    @after-leave="!visible && onDestory()"
  >
    <div
      ref="messageRef"
      class="er-message"
      :class="{
        [`er-message--${type}`]: type,
        'is-close': showClose,
        'text-center': center,
      }"
      :style="customStyle"
      v-show="visible"
      role="alert"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <er-icon class="er-message__icon" :icon="iconName" />
      <div class="er-message__content">
        <slot>
          <render-vnode v-if="message" :vNode="message" />
        </slot>
      </div>
      <div class="er-message__close" v-if="showClose">
        <er-icon icon="xmark" @click.stop="close" />
      </div>
    </div>
  </Transition>
</template>

<style scoped> 
@import './style.css';
</style>