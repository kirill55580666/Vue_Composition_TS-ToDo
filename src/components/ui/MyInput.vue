<template>
  <input
      :class="$style.input"
      type="text"
      :value="modelValue"
      @input="inputHandler"
  />
</template>

<script setup lang="ts">

const emit = defineEmits(['update:modelValue'])

const { modelValue } = defineProps<{
  modelValue: string | number;
}>()

const inputHandler = (e: InputEvent) => {
  const target = e.target as HTMLInputElement;
  emit('update:modelValue', target.value)
}
</script>

<style lang="scss" module>
.input {
  width: 100%;
  border: 1px solid teal;
  padding: 10px 15px;
  margin-top: 15px;
}
</style>