<script setup lang="ts">
import { ref , computed } from 'vue';
import type { AlertProps, AlertEmits } from './types';
import { typeIconMap } from '@xiaozi-element/utils';
import ErIcon  from '../Icon/Icon.vue';

defineOptions({
  name: 'ErAlert'
})

const props = withDefaults(defineProps<AlertProps>(),{
  effect:'light',
  closable:true,
  center:false,
  showIcon:false,
});
const emit = defineEmits<AlertEmits>();

const slots =defineSlots()

const visible =ref(true)

const iconName = computed(()=>{
  return typeIconMap.get(props.type as string) ?? "circle-info"
})

const withDescription = computed(()=>{
  return props.description || slots.default
})

function close(){
  visible.value=false
  emit('close')
}

function open(){
  visible.value=true
}

defineExpose({
  open,
  close
})
</script>

<template>
  <transition name="er-alert-fade">
    <div
      v-show="visible"
      class="er-alert"
      role="alert"
      :class="{
        [`er-alert__${type}`]: type,
        [`er-alert__${effect}`]: effect,
        'text-center': center,
      }"
    >
      <er-icon
        v-if="showIcon"
        class="er-alert__icon"
        :class="{ 'big-icon': withDescription }"
        :icon="iconName"
      />
      <div class="er-alert__content">
        <span
          class="er-alert__title"
          :class="{ 'with-desc': withDescription }"
          :style="{ display: center && !showIcon ? 'flow' : 'inline' }"
        >
          <slot name="title">{{ title }}</slot>
        </span>
        <p class="er-alert__description">
          <slot>{{ description }}</slot>
        </p>
        <div class="er-alert__close" v-if="closable">
          <er-icon @click.stop="close" icon="xmark" />
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
@import './style.css';
</style>
