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
          <v-toolbar-title color="white">Enter your name</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="name"
              name="login"
              label="Login"
              type="text"
            ></v-text-field>
            <div class="error-text" v-if="!!errorsName">{{ errorsName }}</div>
          </v-form>
        </v-card-text>
        <span>{{ user?.value }}</span>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" type="submit">
            <v-progress-circular
              v-if="loading"
              indeterminate
              color="primary"
            ></v-progress-circular>
            <p v-if="!loading">Login</p>
          </v-btn>
        </v-card-actions>
      </v-card>
    </form>
  </div>
</template>

<script>
import { USER_BY_NAME, CREATE_USER } from "../gql/users";
export default {
  data() {
    return {
      name: "",
      errorsName: "",
      loading: false,
    };
  },
  methods: {
    async handleSubmit() {
      const setUser = async (newUser) => {
        sessionStorage.setItem("user", JSON.stringify(newUser));
        this.$router.push({ name: "Dashboard" });
      };

      try {
        if (this.name === "") {
          this.errorsName = "É preciso informar o seu nome para continuar.";
          return;
        } else {
          this.errorsName = "";
        }

        this.loading = true;

        const { data } = await this.$apollo.query({
          query: USER_BY_NAME,
          variables: {
            name: this.name,
          },
        });

        const user = data?.users[0] || {};

        if (!!user?.name) {
          await setUser(user);
        } else {
          const uuid = Number(
            String((new Date().valueOf() / 9999) * 5).split(".")[1]
          );
          const newUser = {
            userId: uuid,
            name: this.name,
            permission: null,
          };

          const { data } = await this.$apollo.mutate({
            mutation: CREATE_USER,
            variables: {
              input: newUser,
            },
          });
          if (data?.createUsers?.users?.length > 0) {
            await setUser(newUser);
          }
        }
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
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
