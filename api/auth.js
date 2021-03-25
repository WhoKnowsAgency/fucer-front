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
  async actualizarUsuario({ nombre, email, password, currentPassword }) {
    let datos = {};
    if (nombre) {
      datos.nombre = nombre;
    }
    if (email) {
      datos.email = email;
    }
    if (password) {
      datos.password = password;
    }
    if (currentPassword) {
      datos.currentPassword = currentPassword;
    }
    return await $axios.$patch(`api/${resource}/user`, datos);
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
