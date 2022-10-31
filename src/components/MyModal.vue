<template>
  <div v-if="show" :class="$style.dialog" @click="hideDialog">
    <div :class="$style.content" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>

// const { show } = withDefaults(defineProps<{
//   show: boolean
// }>(), {
//   show: false
// })

const { show = false} = defineProps<{
  show: boolean,
}>()

const emit = defineEmits(['update:show'])

const hideDialog = () => {
  emit("update:show", false)
}

</script>

<style lang="scss" module>
.dialog {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, .5);
  display: flex;
}
.content {
  margin: auto;
  background: white;
  border-radius: 12px;
  min-height: 50px;
  padding: 20px;
}
</style>