<script lang="ts" setup>
import type { DropdownProps,DropdownEmits,DropdownItemProps,DropdownInstance,DropdownContext } from "./types";
import type { TooltipInstance } from "../Tooltip/type";
import  { ErButton, ErButtonGroup,type ButtonInstance } from '../Button/index'
import { ref ,computed,provide} from "vue";
import { omit,isNil } from "lodash-es";
import DropdownItem from "./DropdownItem.vue";
import ErTooltip from "../Tooltip/Tooltip.vue";
import { DROPDOWN_CTX_KEY } from "./constants";
import { useDisabledStyle } from "@xiaozi-element/hooks";

defineOptions({
  name: "ErDropdown",
  inheritAttrs:false
});

const props = withDefaults(defineProps<DropdownProps>(),{
  hideOnClick:true,
  items:()=>[] as DropdownItemProps[] 
})

const emits =defineEmits<DropdownEmits>()

const slots =defineSlots()

const tooltipRef=ref<TooltipInstance>()
const triggerRef=ref<ButtonInstance>()

const tooltipProps=computed(()=>({
  ...omit(props,['items','hideOnClick','size','type','splitButton']),
}))

const virtualRef=computed(()=>{
  return triggerRef.value?.ref ?? void 0
})

function handleItemClick(e:DropdownItemProps){
  props.hideOnClick && tooltipRef.value?.hide()
  !isNil(e.command) && emits('command',e.command)

}

!TEST && useDisabledStyle()

provide<DropdownContext>(DROPDOWN_CTX_KEY,{
  handleItemClick,
  size:computed(()=>props.size),
})

defineExpose<DropdownInstance>({
  open:()=>tooltipRef.value?.show(),
  close:()=>tooltipRef.value?.hide(),
})
</script>

<template>
  <div class="er-dropdown" 
  :class="{'is-disabled': props.disabled}">
    <er-tooltip
    ref="tooltipRef"
    v-bind="tooltipProps"
    :virtual-triggering="splitButton"
    :virtual-ref="virtualRef?.value"
    @visible-change="$emit('visible-change', $event)"
    >
      <er-button-group v-if="splitButton" :type="type" :size="size" :disabled="disabled">
        <er-button @click="$emit('click', $event)">
          <slot name="default"></slot>
        </er-button>
        <er-button ref="triggerRef" icon="angle-down" />
      </er-button-group>
      <slot name="default" v-else></slot>
      <template #content>
        <div class="er-dropdown__menu">
          <slot name="dropdown">
            <template v-for="item in items" :key="item.command">
              <dropdown-item v-bind="item">
              </dropdown-item>
            </template>
          </slot>
        </div>
      </template>
    </er-tooltip>
  </div>  
</template>