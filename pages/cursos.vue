<template>
  <div class="cursos">
    <div class="container">
      <ATabs default-active-key="activos">
        <ATabPane key="abiertos" tab="Inscripciones abiertas">
          <p v-if="cursosConInscripcion.length === 0">
            No hay cursos con inscripciones abiertas.
          </p>
          <masonry :cols="{ default: 4, 1000: 3, 700: 2, 400: 1 }" :gutter="10">
            <CardCurso
              v-for="curso in cursosConInscripcion"
              :key="curso.id"
              :curso="curso"
              tipo="publico"
            />
          </masonry>
        </ATabPane>
        <ATabPane key="activos" tab="Cursos activos">
          <p v-if="cursosActivos.length === 0">No tenés cursos activos.</p>
          <masonry :cols="{ default: 4, 1000: 3, 700: 2, 400: 1 }" :gutter="10">
            <CardCurso
              v-for="curso in cursosActivos"
              :key="curso.id"
              :curso="curso"
              tipo="publico"
            />
          </masonry>
        </ATabPane>
        <ATabPane key="finalizados" tab="Cursos finalizados">
          <p v-if="cursosFinalizados.length === 0">
            No tenés cursos finalizados.
          </p>
          <masonry :cols="{ default: 4, 1070: 3, 710: 2, 400: 1 }" :gutter="10">
            <CardCurso
              v-for="curso in cursosFinalizados"
              :key="curso.id"
              :curso="curso"
              tipo="publico"
            />
          </masonry>
        </ATabPane>
      </ATabs>
    </div>
  </div>
</template>

<script>
import { Tabs } from "ant-design-vue";

export default {
  components: {
    ATabs: Tabs,
    ATabPane: Tabs.TabPane,
  },
  async asyncData({ $api }) {
    return {
      cursosConInscripcion: await $api.cursos.get({ estado: "abierto" }),
      cursosActivos: await $api.cursos.get({ estado: "en-curso" }),
      cursosFinalizados: await $api.cursos.get({ estado: "finalizado" }),
    };
  },
};
</script>

<style lang="less" scoped>
.cursos .container {
  margin-top: 80px;
  margin-bottom: 60px;
}

/deep/ .ant-tabs-content {
  padding-top: 40px;
}
/deep/ .card {
  margin-bottom: 10px !important;
}
/deep/ .ant-tabs-nav .ant-tabs-tab-active {
  font-weight: 700;
}
</style>
