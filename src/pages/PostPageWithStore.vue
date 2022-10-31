<template>
  <div :class="$style.app">
    <h1>Страница с постами</h1>
    <my-input
        v-focus
        v-model="searchQuery"
    />
    <div :class="$style.btns_wrapper">
      <my-button
          @click="showDialog"
      >
        Создать пост
      </my-button>
      <my-select
          v-model="selectedSort"
          :options="state.sortOptions"
      />
    </div>
    <my-modal v-model:show="dialogVisible">
      <post-form
          @create="createPost"
          @remove="removePost"
      />
    </my-modal>
    <post-list
        :posts="store.getters['post/sortedAndSearchedPosts']"
        @remove="removePost"
        v-if="!isPostsLoading"
    />
    <div v-else>Идет загрузка...</div>
    <div v-intersection="loadMorePosts" :class="$style.observer"></div>
    <!--    <div :class="$style.page__wrapper">-->
    <!--      <div-->
    <!--          v-for="pageNumber in totalPages"-->
    <!--          :class="[-->
    <!--            [$style.page],-->
    <!--            {[$style.current_page]: pageNumber === currentPage}-->
    <!--          ]"-->
    <!--          @click="changePage(pageNumber)"-->
    <!--      >-->
    <!--        {{ pageNumber}}-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<script lang="ts" setup>
import {computed, onMounted, reactive, ref, toRef, watch, watchEffect} from "vue";
import PostForm from "@/components/PostForm.vue"
import PostList from "@/components/PostList.vue"
import {IPost} from "@/App.interfaces";
import MyModal from "@/components/MyModal.vue";
import MyButton from "@/components/ui/MyButton.vue";
import axios from "axios";
import MySelect from "@/components/ui/MySelect.vue";
import {useFetchPosts} from "@/hooks/useFetchPosts";
import MyInput from "@/components/ui/MyInput.vue";
import {useStore} from "vuex";
import {IState} from "@/store/postModule";

const store = useStore()


const posts = computed(() => store.state.post.posts)
const isPostsLoading = computed(() => store.state.post.isPostsLoading)
const currentPage = ref<number>(store.state.post.page);

const dialogVisible = ref<boolean>(false)
const selectedSort = computed(() => store.state.post.selectedSort)
const searchQuery = computed(() => store.state.post.searchQuery)

const state = reactive({
  sortOptions: [
    {value: 'title', name: 'По названию'},
    {value: 'body', name: 'По описанию'},
  ]
})

onMounted( async () => {
  await store.dispatch("post/fetchPosts");
})

const loadMorePosts = async () => {
  await store.dispatch("post/loadMorePosts")
}

const createPost = (post: IPost) => {
  posts?.value?.push(post)
  dialogVisible.value = false
}
const removePost = (removedPost: IPost) => {
  store.state.post.posts = store.state.post.posts.filter((post: any) => post.id !== removedPost.id)
}

const showDialog = () => {
  dialogVisible.value = true
}

const changePage = async (pageNumber: number) => {
  // const target = e.target as HTMLDivElement;
  // currentPage.value = Number(target.innerText);
  currentPage.value = pageNumber
}
</script>

<style lang="scss" module>
* {
  box-sizing: border-box;
  margin: 0;
}
.app {
  padding: 20px;
  position: relative;
}
.btns_wrapper {
  display: flex;
  justify-content: space-between;
}
.page__wrapper {
  display: flex;
  margin-top: 15px;
}
.page {
  border: 1px solid black;
  padding: 10px;
  cursor: pointer;
}
.current_page {
  border: 2px solid teal;
}
.observer {
  height: 30px;
  background: green;
}
</style>