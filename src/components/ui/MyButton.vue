<template>
  <button :class="$style.btn">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">

</script>

<style lang="scss" module>
.btn {
  padding: 10px 15px;
  background: none;
  color: teal;
  border: 1px solid teal;
}
</style>