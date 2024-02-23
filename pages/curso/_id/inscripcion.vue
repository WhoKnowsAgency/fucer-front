<template>
  <LayoutsCursoPublico
    :titulo="curso.nombre"
    :volver="{
      to: `/curso/${curso.id}`,
      text: 'Volver al curso',
    }"
  >
    <template v-if="curso.enlace_inscripcion" #cuerpo>
      <embed
        title="Formulario de inscripción"
        width="100%"
        height="400"
        class="curso_inscripcion"
        :src="curso.enlace_inscripcion"
      />
    </template>

    <template v-if="!curso.enlace_inscripcion" #extra>
      <AEmpty class="curso_empty">
        <div slot="description">
          <h3>Las inscripciones para este curso se encuentran cerradas</h3>
        </div>
      </AEmpty>
    </template>
  </LayoutsCursoPublico>
</template>

<script>
import { Empty } from "ant-design-vue";
export default {
  auth: false,
  components: {
    AEmpty: Empty,
  },
  async fetch() {
    if (!this.$route.params.id) return;
    try {
      await this.$store.dispatch("cursos/getById", this.$route.params.id);
      this.curso = this.$store.state.cursos.byId[this.$route.params.id];
    } catch (e) {
      console.error(e);
      if (process.client) {
        this.$router.push({ name: "404" });
      }
    }
  },
  data() {
    return {
      curso: {
        id: 0,
      },
    };
  },
  head() {
    return {
      title: this.curso.nombre,
    };
  },
};
</script>

<style lang="less" scoped>
.curso_inscripcion {
  width: 100%;
  height: 600px;
  max-height: 70vh;
  border: 0;
  border-radius: 10px;
  margin-bottom: -5px;
}
.curso_empty {
  padding-top: 40px;
  margin: -140px 0 100px !important;
}
</style>
