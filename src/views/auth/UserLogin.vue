<template>
  <div>
    <h3>Login Page</h3>
    <hr />
    <form>
      <div>
        <label for="email">Email</label>
        <input id="email" type="text" />
      </div>
      <div>
        <label for="email">Email</label>
        <input id="pass" type="password" />
      </div>
      <button type="submit">Login</button>
    </form>
    <div>
      <router-link to="/signup">go to Signup </router-link>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style></style>
