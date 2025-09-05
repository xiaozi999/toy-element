<script setup lang="ts">
import { computed, useSlots } from 'vue'

const props = withDefaults(defineProps<{
  loading?: boolean
  disabled?: boolean
}>(), {
  loading: false,
  disabled: false
})

// Type-only: declare available slots and their props
const _slotTypes = defineSlots<{
  default(props: { loading: boolean }): any
  icon?(): any
}>()

// Runtime: check if default slot content exists to decide spacing
const slots = useSlots()
const hasDefault = computed(() => !!slots.default?.().length)
const iconStyles = computed(() => ({
  marginRight: hasDefault.value ? '5px' : '0px'
}))
</script>

<template>
  <button class="demo-btn" :disabled="disabled">
    <span v-if="$slots.icon" :style="iconStyles">
      <slot name="icon" />
    </span>
    <span>
      <!-- Pass loading to default slot (typed by defineSlots above) -->
      <slot :loading="loading">
        <span>{{ loading ? 'Loading…' : 'Button' }}</span>
      </slot>
    </span>
  </button>
  
</template>

<style scoped>
.demo-btn {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background: #fff;
  color: #606266;
  cursor: pointer;
}
.demo-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>

