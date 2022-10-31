<template>
  <div v-show="posts.length > 0">
    <transition-group name="postsList">
      <post-item
          v-for="post in posts"
          :key="post.id"
          :post="post"
          @remove="removePost"
      />
    </transition-group>
  </div>
  <h2 v-show="posts.length <= 0">
    Список постов пуст
  </h2>
</template>

<script lang="ts" setup>

import PostItem from "@/components/PostItem.vue";
import {IPost} from "@/App.interfaces";

const emit = defineEmits(['remove'])

const removePost = (post: IPost) => {
  emit("remove", post)
}

const props = defineProps<{
  posts: IPost[]
}>()

</script>

<style lang="scss" module>

</style>

<style scoped>
.postsList-item {
  display: inline-block;
  margin-right: 10px;
}
.postsList-enter-active, .postsList-leave-active {
  transition: all .4s;
}
.postsList-enter-from,
.postsList-leave-to {
  opacity: 0;
  transform: translateX(130px);
}

.postsList-move {
  transition: transform 1s;
}
</style>