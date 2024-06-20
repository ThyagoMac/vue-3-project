import axios from "axios";

export default {
  getTodos({ commit }) {
    console.log("caiu aqui");
    return axios.get("http://localhost:3000/todos").then((response) => {
      console.log("set todo: ", response.data);
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
