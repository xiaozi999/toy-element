<script setup lang="ts">
import { ref } from 'vue'
import DemoButton from './DemoButton.vue'

const isLoading = ref(false)
</script>

<template>
  <div class="demo-wrap">
    <h3>Demo: defineSlots (typing) + useSlots (runtime)</h3>

    <div class="row">
      <DemoButton :loading="isLoading">
        <template #icon>
          <!-- any icon node -->
          <span class="icon">★</span>
        </template>
        <template #default="{ loading }">
          {{ loading ? 'Creating…' : 'Create' }}
        </template>
      </DemoButton>

      <button class="ctrl" @click="isLoading = !isLoading">
        Toggle loading ({{ isLoading ? 'on' : 'off' }})
      </button>
    </div>

    <div class="row">
      <span class="note">Spacing check:</span>
      <DemoButton>
        <template #icon><span class="icon">✓</span></template>
        <!-- no default slot: icon should have no right margin -->
      </DemoButton>

      <DemoButton>
        <template #icon><span class="icon">✓</span></template>
        Text present should add margin-right 5px
      </DemoButton>
    </div>
  </div>
</template>

<style scoped>
.demo-wrap { display: grid; gap: 12px; }
.row { display: flex; align-items: center; gap: 12px; }
.icon { display: inline-block; width: 1em; text-align: center; }
.ctrl { padding: 4px 8px; }
.note { color: #909399; }
</style>

