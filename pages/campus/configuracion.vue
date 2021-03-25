<template>
  <div class="configuracion">
    <div class="container">
      <ABreadcrumb>
        <ABreadcrumbItem>
          <NuxtLink to="/campus">Campus</NuxtLink>
        </ABreadcrumbItem>
        <ABreadcrumbItem>Configuración</ABreadcrumbItem>
      </ABreadcrumb>
      <div>
        <h1>Configuración</h1>
      </div>
      <div class="box">
        <h2>Editá tus datos</h2>
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
              id="claveNueva"
              v-model="claveNueva"
              label="Nueva clave"
              :rules="{
                required: !!claveNuevaConfirmacion,
                password: true,
              }"
              autocomplete="new-password"
            />

            <ControlPassword
              id="claveNuevaConfirmacion"
              v-model="claveNuevaConfirmacion"
              label="Repetí tu nueva clave"
              :rules="{
                required: !!claveNueva,
                confirmed: 'claveNueva',
              }"
              autocomplete="new-password"
            />

            <ControlPassword
              id="claveActual"
              v-model="claveActual"
              label="Clave actual"
              :rules="{
                required: !!claveNueva,
              }"
              autocomplete="current-password"
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
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import { Button, Breadcrumb } from "ant-design-vue";

export default {
  components: {
    AButton: Button,
    ABreadcrumb: Breadcrumb,
    ABreadcrumbItem: Breadcrumb.Item,
  },
  data() {
    return {
      email: this.$auth.user.email,
      claveActual: "",
      claveNueva: "",
      claveNuevaConfirmacion: "",
      nombre: this.$auth.user.nombre,
      error: "",
      status: "stale",
    };
  },
  computed: {
    txtSubmit() {
      return this.status === "pending" ? "procesando..." : "Guardar cambios";
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
        await this.$api.auth.actualizarUsuario({
          nombre: this.nombre,
          email: this.email,
          password: this.claveNueva,
          currentPassword: this.claveActual,
        });
        this.$toast.show("Datos actualizados con éxito.");
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
      title: "Configuración",
    };
  },
};
</script>

<style lang="less">
@import "~assets/less/components/box";
@import "~assets/less/components/form-error";
</style>

<style lang="less" scoped>
.configuracion .container {
  margin-top: 55px;
  margin-bottom: 200px;
}

h1 {
  font-weight: bold;
  font-size: 30px;
  line-height: 38px;
  margin-top: 16px;
  margin-bottom: 20px;
  color: @daybreak-blue-10;
}

h2 {
  font-size: 20px;
  font-weight: bold;
  color: @daybreak-blue-10;
  text-align: center;
}
</style>
