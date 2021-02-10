<template>
  <div class="activar-cuenta">
    <div class="box">
      <h1>Activá tu cuenta</h1>

      <p v-show="error" ref="error" tabindex="-1" class="form-error">
        {{ error }}
      </p>

      <!-- eslint-disable-next-line vue/no-v-html -->
      <p class="mensaje" v-html="mensaje" />

      <a-button
        v-if="status === 'error'"
        html-type="submit"
        type="primary"
        shape="round"
        block
      >
        <NuxtLink to="/auth/login"> Iniciá sesión </NuxtLink>
      </a-button>
      <a-button
        v-if="status === 'stale'"
        html-type="submit"
        type="primary"
        shape="round"
        block
      >
        <NuxtLink to="/campus"> Accedé al campus </NuxtLink>
      </a-button>
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
      mensaje: "Procesando...",
      error: "",
      status: "stale",
    };
  },
  created() {
    if (!process.client) return;
    this.activarCuenta();
  },
  methods: {
    async activarCuenta() {
      try {
        this.status = "pending";
        if (this.$nuxt.isOffline) {
          this.error =
            "No pudimos conectarnos con el servidor. Comprobá tu conexión a internet y volvé a intentar.";
          return;
        }
        if (process.client) this.$announcer.set(this.mensaje);
        let {
          data: { token },
        } = await this.$api.auth.activarCuenta(this.$route.params.token);
        this.status = "stale";

        // Loggea automáticamente al usuario
        await this.$auth.setUserToken(token);

        this.mensaje =
          "¡Bienvenido, " +
          this.$auth.user.nombre +
          "!<br><br> Tu email ha sido confirmado.";
        if (process.client) this.$announcer.set(this.mensaje);
      } catch (e) {
        this.status = "error";
        this.mensaje = e;
        if (process.client) this.$announcer.set(this.mensaje);
      }
    },
  },
  head() {
    return {};
  },
};
</script>

<style lang="less">
@import "~assets/less/components/box";
@import "~assets/less/components/form-error";
@import "~assets/less/components/form-help";
</style>

<style lang="less">
.activar-cuenta .mensaje {
  text-align: center;
}
</style>
