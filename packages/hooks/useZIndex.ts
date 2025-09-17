import { ref, computed } from 'vue'

const zIndex=ref(0)

export default function useZIndex(initVal=2000){
  const _initVal = ref(initVal)
  const currentZIndex = computed(()=>{
    return _initVal.value + zIndex.value
  })
  const nextZIndex = ()=>{
    zIndex.value++
    return currentZIndex.value
  }
  return {
    initValue:_initVal,
    currentZIndex,
    nextZIndex
  }
}