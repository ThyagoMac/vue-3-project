export default {
  setTodos(state, payload) {
    state.todos = payload;
  },
  setTodo(state, payload) {
    const index = state.todos.findIndex((todo) => todo.id === payload.id);
    if (index >= 0) {
      state.todos.splice(index, 1, payload);
      return;
    }
    state.todos.push(payload);
  },
  deleteTodo(state, id) {
    const index = state.todos.findIndex((todo) => todo.id === id);
    if (index >= 0) {
      state.todos.splice(index, 1);
    }
  },
};
