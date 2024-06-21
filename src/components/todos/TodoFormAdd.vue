<template>
  <form
    class="flex items-center px-4 bg-gray-900 h-15 rounded-sm border-l-2 border-green-400 mb-3"
    @submit.prevent="onAddTodo"
  >
    <input
      placeholder="Add new item ..."
      type="text"
      class="bg-gray-900 placeholder-gray-500 text-gray-500 font-light focus:outline-none block w-full appearance-none leading-normal py-3 pr-3"
      v-model="title"
    />

    <Spinner v-if="isLoading" />
    <button
      v-else
      class="text-green-400 text-xs font-semibold focus:outline-none"
      type="submit"
      :disabled="isLoading"
    >
      ADD
    </button>
  </form>
</template>
<script>
import Spinner from "@/components/todos/Spinner.vue";
import { ref } from "vue";
import { useStore } from "vuex";
export default {
  components: { Spinner },
  setup() {
    const title = ref("");
    const isLoading = ref(false);
    const store = useStore();

    const onAddTodo = () => {
      if (title.value.length < 1) {
        return;
      }

      isLoading.value = true;

      const data = {
        title: title.value,
        completed: false,
      };

      setTimeout(() => {
        store.dispatch("todos/addTodo", data).finally(() => {
          title.value = "";
          isLoading.value = false;
        });
      }, 800);
    };

    return { title, isLoading, onAddTodo };
  },
};
</script>
<style></style>
