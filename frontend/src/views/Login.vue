<template>
  <div>{{ title }}</div>
  <div id="nav">
    <router-link to="/">Login</router-link> |
    <router-link to="/dashboard">Dashboard</router-link>
  </div>
</template>

<script>
export default {
  setup() {
    return {
      title: "Tela Login",
    };
  },
};
</script>
