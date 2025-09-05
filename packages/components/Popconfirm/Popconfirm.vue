<script setup lang="ts">
import { ref, computed } from 'vue';
import type { TooltipInstance } from '../Tooltip/type';
import type { PopconfirmProps, PopconfirmEmits } from './type';

import { addUnit } from '@xiaozi-element/utils';
import ErButton  from '../Button/Button.vue';
import ErIcon  from '../Icon/Icon.vue';
import ErTooltip from '../Tooltip/Tooltip.vue';

defineOptions({
  name: "ErPopconfirm",
});

const props =withDefaults(defineProps<PopconfirmProps>(),{
  title: "",
  confirmButtonType: "primary",
  confirmButtonText: "Confirm",
  cancelButtonText: "Cancel",
  icon: "question-circle",
  iconColor: "#f90",
  hideAfter: 200,
  width: 150,
})

const emits = defineEmits<PopconfirmEmits>();

const style=computed(()=>{
  return {
    width: addUnit(props.width, 'px'),
  }
})

function hidePopper(){
  toolTipRef.value?.hide()
}

function handleCancel(e:MouseEvent){
  emits('cancel',e)
  hidePopper()
}
function handleConfirm(e:MouseEvent){
  emits('confirm',e)
  hidePopper()
}

const toolTipRef = ref<TooltipInstance>();
</script>

<template>
  <er-tooltip
  ref="toolTipRef"
  trigger="click"
  :hide-timeout="hideAfter"
  >
    <template #content>
      <div class='er-popconfrim' :style="style">
        <div class="er-popconfirm__main">
          <er-icon v-if="!hideIcon && icon" :icon="icon" :style="{ color: iconColor }" />
          {{ title }}
        </div>
      </div>
      <div class="er-popconfirm__action">
        <er-button size="small" :type="cancelButtonType" @click="handleCancel">{{ cancelButtonText }}</er-button>
        <er-button size="small" :type="confirmButtonType" @click="handleConfirm">{{ confirmButtonText }}</er-button>
      </div>
    </template>
    <template v-if="$slots.default" #default>
      <slot></slot>
    </template>
    <template v-if="$slots.reference" #default>
      <slot name="reference"></slot>
    </template>
  </er-tooltip>
</template>

<style scoped> 
@import './style.css';
</style>