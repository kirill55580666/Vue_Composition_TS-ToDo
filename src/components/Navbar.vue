<template>
  <div :class="$style.navbar">
    <div>Vue 3 TypeScript</div>
    <div :class="$style.buttons">
      <my-button @click="$router.push('/posts')">Посты</my-button>
      <my-button @click="$router.push('/store')">Посты в сторе</my-button>
      <my-button @click="$router.push('/')">Главная</my-button>
    </div>
  </div>
</template>

<script setup lang="ts">

import MyButton from "@/components/ui/MyButton.vue";
</script>

<style lang="scss" module>
.navbar {
  height: 50px;
  background-color: lightgray;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0 15px;
}
.buttons {
  margin-left: auto;
}
</style>