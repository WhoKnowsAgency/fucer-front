const resource = "cursos";

export default ($axios) => ({
  async get({ categoria, estado }) {
    return await $axios.$get(`api/${resource}`, {
      params: {
        categoria,
        estado,
      },
    });
  },
  async usuario(finalizado = false) {
    return await $axios.$get(`api/${resource}/usuario`, {
      params: {
        finalizado,
      },
    });
  },
  async getById(id) {
    return await $axios.$get(`api/${resource}/${id}`);
  },
  async comentariosClase(cursoId, claseId) {
    return await $axios.$get(
      `api/${resource}/${cursoId}/${claseId}/comentarios`
    );
  },
});
