<template>
  <div class="cursos">
    <div class="container">
      <ATabs default-active-key="activos" @change="cargarCursos">
        <ATabPane key="abiertos" tab="Inscripciones abiertas">
          <p v-if="cursosConInscripcion.length === 0">
            No hay cursos con inscripciones abiertas.
          </p>
          <CardCurso
            v-for="curso in cursosConInscripcion"
            :key="curso.id"
            :curso="curso"
            tipo="publico"
          />
        </ATabPane>
        <ATabPane key="activos" tab="Cursos activos">
          <p v-if="cursosActivos.length === 0">No tenés cursos activos.</p>
          <CardCurso
            v-for="curso in cursosActivos"
            :key="curso.id"
            :curso="curso"
            tipo="publico"
          />
        </ATabPane>
        <ATabPane key="finalizados" tab="Cursos finalizados">
          <p v-if="cursosFinalizados.length === 0">
            No tenés cursos finalizados.
          </p>
          <CardCurso
            v-for="curso in cursosFinalizados"
            :key="curso.id"
            :curso="curso"
            tipo="publico"
          />
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
/deep/ .ant-tabs-tabpane {
  display: flex;
  flex-wrap: wrap;
  > .card {
    max-width: 348px;
    width: auto;
    flex: 1 1 auto;
    margin: 10px;
  }
}
/deep/ .ant-tabs-nav .ant-tabs-tab-active {
  font-weight: 700;
}
</style>
