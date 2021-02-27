<template>
  <div>
    <div class="box">
      <h1>Recuperar clave</h1>
      <p>Te enviaremos un e-mail para que puedas reiniciar tu clave.</p>
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

          <AButton
            html-type="submit"
            :loading="status === 'pending'"
            type="primary"
            shape="round"
            block
          >
            {{ txtSubmit }}
          </AButton>
          <BtnCancelar to="/auth/login" />
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { Button } from "ant-design-vue";
export default {
  auth: false,
  components: {
    AButton: Button,
  },
  data() {
    return {
      email: this.$route.query.email || "",
      codigo: "",
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
        await this.$api.auth.pedirCambioClave(this.email);
        this.$toast.show(
          "Enviamos un mail a tu cuenta para recuperar tu contraseña.",
          { duration: 5000 }
        );
        this.status = "stale";
      } catch (err) {
        console.error(err);
        this.setError("Hubo un problema ¿es correcto el email ingresado?");
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
@import "~assets/less/components/control-error";
@import "~assets/less/components/controls";
@import "~assets/less/components/form-error";
</style>
