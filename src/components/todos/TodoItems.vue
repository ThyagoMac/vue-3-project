<template>
  <div class="space-y-2">
    <TodoItem
      v-for="todo in $store.state.todos.todos"
      :key="todo.id"
      :todo="todo"
    />
  </div>
</template>
<script>
import TodoItem from "@/components/todos/TodoItem.vue";

export default {
  components: {
    TodoItem,
  },
};
</script>
<style scoped></style>
