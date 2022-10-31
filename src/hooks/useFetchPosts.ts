import axios from "axios";
import {onMounted, Ref, ref} from "vue";
import {IPost} from "@/App.interfaces";

export const useFetchPosts = async (limit: number, page: number, isLoading: Ref) => {
    const data = ref<[]>([])
    const totalPages = ref(0)

    const fetching = async () => {
        try {
            isLoading.value = true;
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                params: {
                    _page: page,
                    _limit: limit,
                }
            })
            totalPages.value = Math.ceil(Number(response.headers['x-total-count']) / limit)
            data.value = response.data
        } catch (e) {
            console.log(e)
        } finally {
            isLoading.value = false;
        }
    }

    await fetching()

    return {
        data, totalPages
    }
}