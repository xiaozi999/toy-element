<script setup lang="ts">
import { computed, ref,type Ref, watchEffect,watch, onUnmounted } from "vue";
import { createPopper, type Instance } from "@popperjs/core";
import type { TooltipProps, TooltipEmits, TooltipInstance } from "./type";
import { bind, debounce, isNil,type DebouncedFunc } from 'lodash-es'
import { useClickOutside } from '@xiaozi-element/hooks'

import useEvenstToTiggerNode from "./useEventsToTriggerNode";

interface _TooltipProps extends TooltipProps{
  virtualRef?: HTMLElement | void
  virtualTriggering?:boolean
}

defineOptions({
  name: "ErTooltip",
});

const props = withDefaults(defineProps<_TooltipProps>(),{
  placement:'bottom',
  trigger:'hover',
  transition:'fade',
  showTimeout:0,
  hideTimeout:200,
})

const emits =defineEmits<TooltipEmits>()

const visible = ref(false);

const events:Ref<Record<string,EventListener>>=ref({})
const outerEvents:Ref<Record<string,EventListener>>=ref({})
const dropdownEvents:Ref<Record<string,EventListener>>=ref({})

const containerNode=ref<HTMLElement>()

const _triggerNode=ref<HTMLElement>()
const triggerNode=computed(()=>{
  if(props.virtualTriggering){
    return (
      (props.virtualRef as HTMLElement) ?? _triggerNode.value
    )
  }
  return _triggerNode.value as HTMLElement
})

const popperNode=ref<HTMLElement>()

const transition=ref('fade')

const popperOptions=computed(()=>({
  placements:props.placement,
  modifiers:[
    {
      name:'offset',
      options:{
        offset:[0,9]
      }
    },
  ],
  ...props.popperOptions
}))

const openDelay=computed(()=>props.trigger==='hover'?props.showTimeout:0)

const closeDelay=computed(()=>props.trigger==='hover'?props.hideTimeout:0)

let openDebounced:DebouncedFunc<()=>void> | void

let closeDebounced:DebouncedFunc<()=>void> | void

function openFinal(){
  closeDebounced?.cancel()
  openDebounced?.()
}

function closeFinal(){
  openDebounced?.cancel()
  closeDebounced?.()
}

function togglePopper(){
  visible.value? closeFinal():openFinal()
}

function setVisible(value:boolean){
  if(props.disabled) return 
  visible.value=value
  emits('visible-change',value)
}

function attachEvents(){
  if(props.disabled || props.manual) return
  if (props.trigger==='hover'){
    events.value['mouseenter']=openFinal
    outerEvents.value['mouseleave']=closeFinal
    dropdownEvents.value['mouseenter']=openFinal
    return
  }
  if(props.trigger==='click'){
    events.value['click']=togglePopper
    return
  }
  if(props.trigger==='contextmenu'){
    events.value['contextmenu']=(e)=>{
      e.preventDefault();
      openFinal()
    }
    return
  }
}

let popperInstance:null|Instance

function destroyPopperInstance(){
  if(isNil(popperInstance)) return
  popperInstance.destroy()
  popperInstance=null
}

function resetEvents(){
  events.value={}
  outerEvents.value={}
  dropdownEvents.value={}
  attachEvents()
}

const show:TooltipInstance["show"]=openFinal
const hide:TooltipInstance["hide"]=function(){
  openDebounced?.cancel();
  setVisible(false)
}

watch(visible,(val)=>{
  if(!val) return 
  if(_triggerNode.value && popperNode.value){
    popperInstance=createPopper(
      _triggerNode.value,
      popperNode.value,
      popperOptions.value
    )
  }
},{
  flush:'post'
})

watch(()=>props.manual,(isManual)=>{
  if(isManual){
    resetEvents()
    return 
  }
  attachEvents()
})

watch(()=>props.trigger,(val,oldVal)=>{
  if(val===oldVal) return 
  openDebounced?.cancel
  visible.value=false
  emits("visible-change",false)
  resetEvents()
})

watchEffect(() => {
  if(!props.manual){
    attachEvents()
  } 
  openDebounced = debounce(bind(setVisible, null, true), openDelay.value);
  closeDebounced = debounce(bind(setVisible, null, false), closeDelay.value);
});

useClickOutside(containerNode,()=>{
  emits('click-outside')
  if(props.trigger==='hover' || props.manual) return
  visible.value && closeFinal()
  resetEvents()
})

useEvenstToTiggerNode(props,triggerNode,events,()=>{
  openDebounced?.cancel()
  setVisible(false)
})

onUnmounted(()=>{
  destroyPopperInstance()
})

defineExpose<TooltipInstance>({
  show,
  hide
})
</script>

<template>
    <div class="er-tooltip" ref="containerNode" v-on="outerEvents">
    <div
      class="er-tooltip__trigger"
      ref="_triggerNode"
      v-on="events"
      v-if="!virtualTriggering"
    >
      <slot></slot>
    </div>
    <slot name="default" v-else></slot>

    <transition :name="transition" @after-leave="destroyPopperInstance">
      <div
        class="er-tooltip__popper"
        ref="popperNode"
        v-on="dropdownEvents"
        v-if="visible"
      >
        <slot name="content">
          {{ content }}
        </slot>
        <div id="arrow" data-popper-arrow></div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
@import "./style.css";
</style>