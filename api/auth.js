const resource = "auth";

export default ($axios) => ({
  async crearCuenta({ nombre, email, password }) {
    return await $axios.$post(`api/${resource}/user`, {
      nombre,
      email,
      password,
    });
  },
  async activarCuenta(token) {
    return await $axios.$post(`api/${resource}/activate`, {
      token,
    });
  },
  async pedirCambioClave(email) {
    return await $axios.$post(`api/${resource}/send-reset-password-email`, {
      email,
    });
  },
  async confirmarCambioClave(password, token) {
    return await $axios.$post(`api/${resource}/reset-password`, {
      password,
      token,
    });
  },
});
