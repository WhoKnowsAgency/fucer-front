<template>
  <div class="cursos">
    <div class="container">
      <ATabs :active-key="tabActiveKey" @change="tabsUpdateActiveKey">
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
        <ATabPane key="activos" tab="En desarrollo">
          <p v-if="cursosActivos.length === 0">No hay cursos en desarrollo.</p>
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
            No hay cursos finalizados.
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
  auth: false,
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
  data() {
    return {
      tabActiveKey:
        (window && window.location.hash.replace("#", "")) || "abiertos",
    };
  },
  methods: {
    tabsUpdateActiveKey(activeKey) {
      console.log("tabsUpdateActiveKey", activeKey);
      this.tabActiveKey = activeKey;
      window.location.hash = "#" + activeKey;
    },
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
  word-spacing: -0.3em;
}
</style>
