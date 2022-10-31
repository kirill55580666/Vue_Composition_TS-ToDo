<template>
  <div :class="$style.post">
    <div>
      <div>{{ post.id }}</div>
      <div><strong>Название:</strong> {{ post.title }}</div>
      <div><strong>Описание:</strong> {{ post.body }}</div>
    </div>
    <div :class="$style.post__btns">
      <my-button @click="openPostPage(post.id)">
        Открыть
      </my-button>
      <my-button @click="removePost">
        Удалить
      </my-button>
    </div>
  </div>
</template>

<script lang="ts" setup>

import {IPost} from "@/App.interfaces";
import MyButton from "@/components/ui/MyButton.vue";
import {useRouter} from "vue-router";

const { post } = defineProps<{
  post: IPost
}>()

const emit = defineEmits(['remove'])

const router = useRouter()

const removePost = () => {
  emit("remove", post)
}

const openPostPage = (id: number) => {
  router.push(`/posts/${id}`)
}
</script>

<style lang="scss" module>
.post__btns {
  display: flex;
}
.post {
  padding: 15px;
  border: 2px solid teal;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>