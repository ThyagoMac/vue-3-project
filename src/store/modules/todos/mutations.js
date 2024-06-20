export default {
  setTodos(state, payload) {
    console.log("settodos mutation", state.todos, payload);
    state.todos = payload;
  },
  setTodo(state, payload) {
    console.log("settodo mutation");
    const index = state.todos.findIndex((todo) => todo.id === payload.id);
    if (index >= 0) {
      state.todos.splice(index, 1, payload);
      return;
    }
    state.todos.push(payload);
  },
  deleteTodo(state, id) {
    console.log("deletetodos mutation");
    const index = state.todos.findIndex((todo) => todo.id === id);
    if (index >= 0) {
      state.todos.splice(index, 1);
    }
  },
};
