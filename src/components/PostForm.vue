<template>
  <form :class="$style.form" @submit.prevent>
    <h4>Создание поста</h4>
    <my-input
        v-focus
        v-model="post.title"
        placeholder="Название"
    />
    <my-input
        :value="post.body"
        @input="inputBody"
        placeholder="Описание"
    />
    <my-button
      @click="createPost"
      :class="$style.btn"
    >
      Создать
    </my-button>
  </form>
</template>

<script lang="ts">
import {defineComponent, watchEffect} from "vue";
import MyButton from "@/components/ui/MyButton.vue";
import MyInput from "@/components/ui/MyInput.vue";
import {IPost} from "@/App.interfaces";

export default defineComponent ({
  components: {MyButton, MyInput},
  data() {
    return {
      post: {
        title: '',
        body: '',
      } as IPost
    }
  },
  methods: {
    inputTitle(e: InputEvent) {
      const target = e.target as HTMLInputElement;
      this.post.title = target.value;
    },
    inputBody(e: InputEvent) {
      const target = e.target as HTMLInputElement;
      this.post.body = target.value;
    },
    createPost() {
      this.post.id = Date.now(),
      this.$emit('create', this.post);
      this.post = {
        title: '',
        body: ''
      }
    },
  }
});
</script>

<style lang="scss" module>
.form {
  display: flex;
  flex-direction: column;
}
.btn {
  align-self: self-end;
  margin-top: 15px;
}
</style>