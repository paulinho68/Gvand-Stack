<template>
  <div class="header-main">
    <h1 clas="font-weight-bold">
      Seja bem-vindo <span>{{ userName }}</span>
    </h1>
    <div>
      <v-btn color="white" @click="logout"> Logout </v-btn>
      <v-btn class="ml-4" color="primary" v-show="isAdmin"> Add movie </v-btn>
    </div>
  </div>
</template>

<script>
const user = JSON.parse(sessionStorage.getItem("user"));
export default {
  name: "Header",
  data() {
    return {
      userName: user?.name,
      isAdmin: user?.permission === "admin",
    };
  },
  methods: {
    logout() {
      sessionStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.header-main {
  width: 100%;
  padding: 0 60px;
  height: 70px;
  margin-bottom: 50px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  background-color: #3aabdf;

  span {
    color: #ddd;
  }
}
</style>
