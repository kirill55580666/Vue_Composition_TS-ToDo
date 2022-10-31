<template>
  <select v-model="modelValue" @change="changeOption">
    <option disabled value="">Выберите из списка</option>
    <option
        :key="option.value"
        v-for="option in options"
        :value="option.value"
    >
      {{ option.name }}
    </option>
  </select>
</template>

<script lang="ts" setup>
  import {defineProps} from "vue";

  interface optionsList {
    name: string;
    value: string;
  }

  const { modelValue, options = [] } = defineProps<{
    modelValue: string;
    options: optionsList[];
  }>()

  const emit = defineEmits(['update:modelValue'])

  const changeOption = (e: Event) => {
    const target = e.target as HTMLSelectElement;
    emit("update:modelValue", target.value)
  }
</script>

<style lang="scss" module>

</style>