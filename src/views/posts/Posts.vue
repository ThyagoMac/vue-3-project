<template>
  <div>
    <h1>Post Page</h1>
    <div v-for="post in posts" :key="post.id">
      <strong>{{ post.title }}: </strong> {{ post.text }}
    </div>
  </div>
</template>
<script>
import axiosInstance from "@/services/AxiosTokenInstance";
import { GET_USER_TOKEN_GETTER, IS_LOADING_SHOW } from "@/store/storeconstants";
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      posts: [],
    };
  },
  mounted() {
    this.isLoading(true);
    axiosInstance
      .get(`https://auth-rest-api-tmcl-default-rtdb.firebaseio.com/posts.json`)
      .then((response) => {
        this.posts = response.data;
        this.isLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data.error);
        this.isLoading(false);
      });
  },
  methods: {
    ...mapMutations({ isLoading: IS_LOADING_SHOW }),
  },
  computed: {
    ...mapGetters("auth", {
      token: GET_USER_TOKEN_GETTER,
    }),
  },
};
</script>
<style scoped></style>
