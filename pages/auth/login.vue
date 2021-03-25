<template>
  <div>
    <div class="box">
      <h1>Ingresar</h1>
      <p>
        Inscribite a un curso o accedé al campus virtual. En caso de que quieras
        inscribirte a un curso y no tengas cuenta, podés crearla haciendo
        <NuxtLink to="/auth/crear-cuenta">click aquí</NuxtLink>.
      </p>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form method="post" @submit.prevent="handleSubmit(onSubmit)">
          <p v-show="error" ref="error" tabindex="-1" class="form-error">
            {{ error }}
          </p>

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
            ¿No tenés cuenta?
            <NuxtLink to="/auth/crear-cuenta"> Registrate</NuxtLink>
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
      email: this.$route.query.email || "",
      clave: "",
      error: "",
      status: "stale",
    };
  },
  computed: {
    txtSubmit() {
      return this.status === "pending" ? "procesando..." : "Ingresar";
    },
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
        if (this.$auth.$storage.getUniversal("redirect")) {
          this.$router.push(this.$auth.$storage.getUniversal("redirect"));
        }
        this.status = "stale";
      } catch (err) {
        console.error(err);
        this.setError(err);
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

<style lang="less">
@import "~assets/less/components/box";
@import "~assets/less/components/form-error";
@import "~assets/less/components/form-help";
</style>
<style lang="less" scoped>
p {
  color: @daybreak-blue-10;
  font-size: 14px;
  line-height: 22px;
}
</style>
