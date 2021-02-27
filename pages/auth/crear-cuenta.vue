<template>
  <div>
    <div class="box">
      <h1>Crear cuenta</h1>
      <p>Creá una cuenta para acceder al campus o inscribirte a un curso.</p>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form method="post" @submit.prevent="handleSubmit(onSubmit)">
          <p v-show="error" ref="error" tabindex="-1" class="form-error">
            {{ error }}
          </p>

          <ControlText
            id="nombre"
            v-model="nombre"
            label="Nombre"
            icon="user"
            rules="required"
            autocomplete="given-name"
          />

          <ControlEmail
            id="email"
            v-model="email"
            label="Email"
            rules="required|email"
            autocomplete="email"
          >
            <template #error>El e-mail ingresado es inválido</template>
          </ControlEmail>

          <ControlPassword
            id="clave"
            v-model="clave"
            label="Clave"
            rules="required|password"
            autocomplete="new-password"
          />

          <AButton
            html-type="submit"
            :loading="status === 'pending'"
            type="primary"
            shape="round"
            block
          >
            {{ txtSubmit }}
          </AButton>
          <div class="form-help">
            ¿Ya tenés cuenta?
            <NuxtLink to="/auth/login"> Ingresá</NuxtLink>
          </div>
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
      email: "",
      clave: "",
      nombre: "",
      error: "",
      status: "stale",
    };
  },
  computed: {
    txtSubmit() {
      return this.status === "pending" ? "procesando..." : "Registrarme";
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
        await this.$api.auth.crearCuenta({
          nombre: this.nombre,
          email: this.email,
          password: this.clave,
        });
        this.$toast.show("Enviamos un mail para activar tu cuenta.");
        this.status = "stale";
      } catch (err) {
        this.setError(err);
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
      title: "Creá tu cuenta",
    };
  },
};
</script>

<style lang="less">
@import "~assets/less/components/box";
@import "~assets/less/components/form-error";
</style>
<style lang="less" scoped>
p {
  color: @daybreak-blue-10;
  text-align: center;
  font-size: 14px;
  line-height: 22px;
}
</style>
