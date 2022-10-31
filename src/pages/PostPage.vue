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
        :posts="sortedAndSearchedPosts"
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
import {computed, onMounted, reactive, ref, toRef, watchEffect} from "vue";
import PostForm from "@/components/PostForm.vue"
import PostList from "@/components/PostList.vue"
import {IPost} from "@/App.interfaces";
import MyModal from "@/components/MyModal.vue";
import MyButton from "@/components/ui/MyButton.vue";
import axios from "axios";
import MySelect from "@/components/ui/MySelect.vue";
import {useFetchPosts} from "@/hooks/useFetchPosts";
import MyInput from "@/components/ui/MyInput.vue";


const posts = ref<IPost[]>([]);
const isPostsLoading = ref<boolean>(false);
const totalPages = ref<number>(0);
const currentPage = ref<number>(1);

const dialogVisible = ref<boolean>(false)
const selectedSort = ref<string>('')
const searchQuery = ref<string>('')

const state = reactive({
  sortOptions: [
    {value: 'title', name: 'По названию'},
    {value: 'body', name: 'По описанию'},
  ]
})

// watchEffect(async () => {
//   const {
//     data,
//     totalPages: totalPagesReturned
//   } = await useFetchPosts(10, currentPage.value, isPostsLoading)
//
//   totalPages.value = totalPagesReturned.value;
//   posts.value = data.value;
// })

onMounted( async () => {
  const {
    data,
    totalPages: totalPagesReturned
  } = await useFetchPosts(10, 1, isPostsLoading)

  totalPages.value = totalPagesReturned.value;
  posts.value = data.value;
})


const sortedPosts = computed(() => {
  return [...posts.value].sort((post1, post2) => {
    return (
        post1[selectedSort.value as keyof(Omit<IPost, "id">)]
            ?.localeCompare(post2[selectedSort.value as keyof(Omit<IPost, "id">)])
    );
  })
})

const sortedAndSearchedPosts = computed(() => {
  return [...posts.value]
      .filter((post) => post.title.includes(searchQuery.value))
})

const loadMorePosts = async () => {
  currentPage.value += 1;
  const {
    data: newPosts
  } = await useFetchPosts(10, currentPage.value, isPostsLoading)
  console.log(posts.value)
  posts.value = [...posts.value, ...newPosts.value]
  console.log(posts.value)
}


const createPost = (post: IPost) => {
  posts?.value?.push(post)
  dialogVisible.value = false
}
const removePost = (removedPost: IPost) => {
  posts.value = posts.value.filter((post) => post.id !== removedPost.id)
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