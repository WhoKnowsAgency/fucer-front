const resource = "certificados";

export default ($axios) => ({
  async getByCurso(cursoId) {
    return await $axios.$get(`api/${resource}/obtener/${cursoId}`);
  },
});
