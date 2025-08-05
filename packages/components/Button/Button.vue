<script setup lang="ts">
import { ref ,computed, inject} from 'vue';
import type {ButtonProps,ButtonEmits,ButtonInstance} from './types'
import {template, throttle} from 'lodash-es'
import { BUTTON_GROUP_CTX_KEY } from './contants';
import ErIcon  from '../Icon/Icon.vue';
defineOptions({
  name:'ErButton'
})
const props=withDefaults(defineProps<ButtonProps>(),{
  tag:"button",
  size:'default',
  nativeType:'button',
  disabled:false,
  loading:false,
  useThrottle:true,
  throttleDuration:500,
})

const emits=defineEmits<ButtonEmits>()

const slots=defineSlots()

const ctx= inject(BUTTON_GROUP_CTX_KEY,void 0)

const _ref=ref<HTMLButtonElement>()

const iconStyles=computed(()=>{
  return {
    marginRight:slots.default ? '5px' : '0px',
  }
})

const size = computed(()=>{
  return ctx?.size ?? props?.size ?? ""
})

const type = computed(()=>{
  return ctx?.type ?? props?.type ?? ""
})  

const disabled=computed(()=>{
  return ctx?.disabled || props?.disabled || false
})

const handleClick=(e:MouseEvent)=>emits('click',e)

const handleClickThrottled=throttle(handleClick,props.throttleDuration,{trailing:false})


defineExpose<ButtonInstance>({
  ref:_ref
})
</script>

<template>
  <component 
  :is="props.tag" 
  ref="_ref" 
  :autofocus="autofocus"
  class="er-button"
  :type="tag==='button'? nativeType : void 0" 
  :disabled="disabled || loading ? true : void 0" 
  :class="{
    [`er-button--${type}`]:type,
    [`er-button--${size}`]:size,
    'is-plain':plain,
    'is-round':round,
    'is-circle':circle,
    'is-disabled':disabled,
    'is-loading':loading,
  }"
  @click="(e:MouseEvent)=>useThrottle?handleClickThrottled(e):handleClick(e)"
  >
  <template v-if="loading">
    <slot name="loading">
      <er-icon 
      class="loading-icon" 
      :icon="loadingIcon ?? 'spinner'" 
      :style="iconStyles" 
      size="1x" 
      spin></er-icon>
    </slot>
  </template>
  <er-icon
  v-if="icon&&!loading"
  :icon="icon"
  :style="iconStyles"
  size="1x"></er-icon>
    <slot></slot>
  </component>
</template>


<style scoped>
@import './style.css';
</style>