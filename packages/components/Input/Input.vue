<script setup lang="ts">
import { computed, ref, watch, useAttrs, shallowRef, nextTick } from "vue";
import type { InputProps, InputEmits, InputInstance } from "./types";
import { useFormItem, useFormDisabled, useFormItemInputId } from "../Form";
import { debugWarn } from "@xiaozi-element/utils";
import { useFocusController,useId } from "@xiaozi-element/hooks";
import { each, noop } from "lodash-es";
import Icon from "../Icon/Icon.vue";

defineOptions({
  name: "ErInput",
  inheritAttrs: false,
});
const props = withDefaults(defineProps<InputProps>(), {
  type: "text",
  autocomplete: "off",
});
const emits = defineEmits<InputEmits>();

const innerValue = ref(props.modelValue);
const passwordVisible = ref(false);

const inputRef = shallowRef<HTMLInputElement>();
const textareaRef = shallowRef<HTMLTextAreaElement>();

const _ref = computed(() => inputRef.value || textareaRef.value);

const attrs=useAttrs()

const isDisabled = computed(()=>{
  return props.disabled
})

const showClear = computed(()=>{
  return props.clearable && !!innerValue.value && !isDisabled.value && isFocused.value
})

const showPasswordArea = computed(()=>{
  return props.type==='password' && props.showPassword && !isDisabled.value && !!innerValue.value
})

const { wrapperRef, isFocused ,handleFocus,handleBlur } = useFocusController(_ref,{
  afterBlur(){
    //form校验
  }
})

const clear:InputInstance["clear"]=function () {
  innerValue.value=''
  each(['input','change','update:modelValue'],(event)=>{
    emits(event as any,innerValue.value)
  })
  emits('clear')
  //清空表单校验
}
const focus:InputInstance["focus"]=async function(){
  await nextTick();
  _ref.value?.focus()
}
const blur:InputInstance["blur"]=async function(){
  _ref.value?.blur()
}
const select:InputInstance["select"]=async function(){
  _ref.value?.select()
}

function handleInput(){
  emits("input",innerValue.value)
  emits("update:modelValue",innerValue.value)
}

function handleChange(){
  emits("change",innerValue.value)
}

function togglePasswordVisible(){
  passwordVisible.value = !passwordVisible.value
}

watch(
  ()=>{
    return props.modelValue
  },
  (newVal)=>{
    innerValue.value = newVal
  }
)

defineExpose<InputInstance>({
  ref:_ref,
  focus,
  blur,
  select,
  clear
})
</script>

<template>
  <div
    class="er-input"
    :class="{
      [`er-input--${type}`]: type,
      [`er-input--${size}`]: size,
      'is-disabled': isDisabled,
      'is-prepend': $slots.prepend,
      'is-append': $slots.append,
      'is-prefix': $slots.prefix,
      'is-suffix': $slots.suffix,
      'is-focus': isFocused,
    }"
  >
    <!-- input -->
    <template v-if="type !== 'textarea'">
      <!-- prepend slot -->
      <div v-if="$slots.prepend" class="er-input__prepend">
        <slot name="prepend"></slot>
      </div>
      <div class="er-input__wrapper" ref="wrapperRef">
        <!-- prefix slot -->
        <span v-if="$slots.prefix" class="er-input__prefix">
          <slot name="prefix"></slot>
        </span>
        <input
          :id="useId().value"
          class="er-input__inner"
          ref="inputRef"
          :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
          :disabled="isDisabled"
          :readonly="readonly"
          :autocomplete="autocomplete"
          :placeholder="placeholder"
          :autofocus="autofocus"
          :form="form"
          v-model="innerValue"
          v-bind="attrs"
          @input="handleInput"
          @change="handleChange"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        <!-- suffix slot -->
        <span
          v-if="$slots.suffix || showClear || showPasswordArea"
          class="er-input__suffix"
        >
          <slot name="suffix"></slot>
          <Icon
            icon="circle-xmark"
            v-if="showClear"
            class="er-input__clear"
            @click="clear"
            @mousedown.prevent="noop"
          />
          <Icon
            icon="eye"
            v-if="showPasswordArea && passwordVisible"
            class="er-input__password"
            @click="togglePasswordVisible"
          />
          <Icon
            icon="eye-slash"
            v-if="showPasswordArea && !passwordVisible"
            class="er-input__password"
            @click="togglePasswordVisible"
          />
        </span>
      </div>
      <!-- append slot -->
      <div v-if="$slots.append" class="er-input__append">
        <slot name="append"></slot>
      </div>
    </template>

    <!-- textarea -->
    <template v-else>
      <textarea
        :id="useId().value"
        class="er-textarea__wrapper"
        ref="textareaRef"
        :disabled="isDisabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        :autofocus="autofocus"
        :form="form"
        v-model="innerValue"
        v-bind="attrs"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      ></textarea>
    </template>
  </div>
</template>

<style>
@import './style.css';
</style>