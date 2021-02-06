<template>
  <div>
    <div class="box">
      <h1>Recuperar clave</h1>
      <p>
        Por favor ingrese una nueva clave para su cuenta
        <b>{{ email }}</b>
      </p>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form method="post" @submit.prevent="handleSubmit(onSubmit)">
          <p v-show="error" ref="error" tabindex="-1" class="form-error">
            {{ error }}
          </p>

          <ControlPassword
            id="claveNueva"
            v-model="claveNueva"
            label="Nueva contraseña"
            rules="required|password"
            autocomplete="new-password"
          />

          <ControlPassword
            id="claveNuevaConfirmacion"
            v-model="claveNuevaConfirmacion"
            label="Repetir contraseña"
            rules="required|confirmed:claveNueva"
            autocomplete="new-password"
          />

          <a-button
            html-type="submit"
            :loading="status === 'pending'"
            type="primary"
            shape="round"
            block
          >
            {{ txtSubmit }}
          </a-button>
          <BtnCancelar to="/auth/login" />
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
export default {
  auth: false,
  validate({ params }) {
    return process.client ? /^[0-9a-z]{32}$/.test(params.token) : true;
  },
  data() {
    return {
      email: this.$route.query.email,
      codigo: "",
      claveNueva: "",
      claveNuevaConfirmacion: "",
      error: "",
      status: "stale",
    };
  },
  computed: {
    txtSubmit() {
      return this.status === "pending" ? "procesando..." : "Enviar";
    },
  },
  methods: {
    async onSubmit() {
      this.error = "";
      if (this.$nuxt.isOffline) {
        this.setError(
          "No pudimos conectarnos con el servidor. Comprobá tu conexión a internet y volvé a intentar."
        );
        return;
      }
      try {
        this.status = "pending";
        await this.$api.auth.confirmarCambioClave(
          this.claveNueva,
          this.$route.params.token
        );
        this.$toast.show("La clave fue actualizada.", { duration: 5000 });
        this.$router.push(
          "/auth/login?email=" + encodeURIComponent(this.email)
        );

        this.status = "stale";
      } catch (err) {
        this.setError("Hubo un problema ¿es correcto el código ingresado?");
      }
    },
    setError(error) {
      this.status = "error";
      this.error = error;
      this.$nextTick(() => this.$refs.error.focus());
    },
  },
  head() {
    return {
      title: "Recuperar clave",
    };
  },
};
</script>

<style lang="less">
@import "~assets/less/components/box";
@import "~assets/less/components/form-error";
</style>
