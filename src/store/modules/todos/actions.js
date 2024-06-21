import axios from "axios";

export default {
  getTodos({ commit }) {
    return axios.get("http://localhost:3000/todos").then((response) => {
      commit("setTodos", response.data);
    });
  },

  addTodo({ commit }, payload) {
    axios.post("http://localhost:3000/todos", payload).then((response) => {
      commit("setTodo", response.data);
    });
  },

  updateTodo({ commit }, { id, payload }) {
    axios.put(`http://localhost:3000/todos/${id}`, payload).then((response) => {
      commit("setTodo", response.data);
    });
  },
  deleteTodo({ commit }, id) {
    axios.delete(`http://localhost:3000/todos/${id}`).then(() => {
      commit("deleteTodo", id);
    });
  },
};
