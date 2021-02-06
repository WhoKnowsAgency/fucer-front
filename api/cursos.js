const resource = "cursos";

export default ($axios) => ({
  async usuario(finalizado = false) {
    return await $axios.$get(`api/${resource}/usuario`, {
      params: {
        finalizado,
      },
    });
  },
});
