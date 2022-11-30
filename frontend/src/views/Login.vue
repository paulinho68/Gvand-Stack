<template>
  <div class="container">
    <form
      class="content"
      action="#"
      method="post"
      @submit.prevent="handleSubmit"
    >
      <v-card class="elevation-12">
        <v-toolbar dark color="#3aabdf">
          <v-toolbar-title>Enter your name</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="name"
              name="login"
              label="Login"
              type="text"
            ></v-text-field>
            <div class="error-text" v-if="!!errors.name">{{ errors.name }}</div>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" type="submit">Login</v-btn>
        </v-card-actions>
      </v-card>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      name: "",
      errors: {
        name: "",
      },
    };
  },
  methods: {
    handleSubmit() {
      if (this.name === "") {
        this.errors.name = "É preciso informar o seu nome para continuar.";
        return;
      } else {
        this.errors.name = "";
      }
      console.log(this.name);
    },
  },
};
</script>

<style lang="scss">
.error-text {
  font-size: 12px;
  color: red;
}
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  .content {
    width: 40%;
    @media (max-width: 1080px) {
      width: 100%;
    }
  }
}
</style>
