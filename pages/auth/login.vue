<template>
  <div>
    <div class="box">
      <h1>Ingresá al campus</h1>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form method="post" @submit.prevent="handleSubmit(onSubmit)">
          <p v-show="error" ref="error" tabindex="-1" class="form-error">
            {{ error }}
          </p>

          <ControlEmail
            id="email"
            v-model="email"
            label="E-mail"
            rules="required|email"
            autocomplete="email"
          >
            <template #error>El e-mail ingresado es inválido</template>
          </ControlEmail>

          <ControlPassword
            id="clave"
            v-model="clave"
            label="Clave"
            rules="required"
            autocomplete="password"
          >
            <template #help>
              <NuxtLink
                :to="`/auth/recuperar-clave${
                  email ? '?email=' + encodeURIComponent(email) : ''
                }`"
              >
                Olvidé mi clave
              </NuxtLink>
            </template>
            <template #error>La contraseña ingresada es incorrecta</template>
          </ControlPassword>

          <a-button
            html-type="submit"
            :loading="status === 'pending'"
            type="primary"
            shape="round"
            block
          >
            Ingresar
          </a-button>
          <div class="form-help">
            ¿No tenés cuenta?
            <NuxtLink to="/auth/crear-cuenta"> Registrate</NuxtLink>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
export default {
  // middleware: "guest",
  data() {
    return {
      email: this.$route.query.email || "",
      clave: "",
      error: "",
      status: "stale",
    };
  },
  methods: {
    setError(error) {
      this.status = "error";
      this.error = error;
      this.$nextTick(() => this.$refs.error.focus());
    },
    async onSubmit() {
      if (this.$nuxt.isOffline) {
        this.setError(
          "No pudimos conectarnos con el servidor. Comprobá tu conexión a internet y volvé a intentar."
        );
        return;
      }
      try {
        this.status = "pending";
        await this.$auth.login({
          data: {
            username: this.email,
            password: this.clave,
          },
        });
        this.status = "stale";
      } catch (err) {
        console.error(err);
        this.setError("E-mail o contraseña incorrectos.");
      }
    },
  },
  head() {
    return {
      title: "Ingresá al campus",
    };
  },
};
</script>

<style lang="less" scoped>
@import "~assets/less/components/box";
@import "~assets/less/components/form-error";
@import "~assets/less/components/form-help";
.btn {
  margin-top: 10px;
}
</style>
