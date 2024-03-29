const resource = "auth";

export default ($axios) => ({
  async crearCuenta({ nombre, email, dni, password }) {
    return await $axios.$post(`api/${resource}/user`, {
      nombre,
      dni,
      email,
      password,
    });
  },
  async activarCuenta(token) {
    return await $axios.$post(`api/${resource}/activate`, {
      token,
    });
  },
  async actualizarUsuario({
    nombre,
    dni,
    email,
    password,
    currentPassword,
    imagen,
  }) {
    let datos = new FormData();
    if (nombre) {
      datos.append("nombre", nombre);
    }
    if (dni) {
      datos.append("dni", dni);
    }
    if (email) {
      datos.append("email", email);
    }
    if (password) {
      datos.append("password", password);
    }
    if (currentPassword) {
      datos.append("currentPassword", currentPassword);
    }
    if (imagen) {
      datos.append("imagen", imagen);
    }
    return await $axios.$post(`api/${resource}/user/update`, datos, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
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
