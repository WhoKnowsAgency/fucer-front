<template>
  <div class="campus">
    <div class="container">
      <div>
        <h1>
          Hola,<br />
          {{ $auth.user.nombre }}
        </h1>

        <div class="botonera">
          <AButton type="dashed" size="small">
            Inscribirme a un curso
            <AIcon type="plus-circle" />
          </AButton>
        </div>
      </div>

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
            tipo="campus"
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
            tipo="campus"
          />
        </ATabPane>
      </ATabs>
    </div>
  </div>
</template>

<script>
import { Tabs, Button, Icon } from "ant-design-vue";
export default {
  components: {
    ATabs: Tabs,
    ATabPane: Tabs.TabPane,
    AButton: Button,
    AIcon: Icon,
  },
  computed: {
    cursosConInscripcion() {
      return this.$store.getters["cursos/abiertos"];
    },
    cursosActivos() {
      return this.$store.getters["cursos/activos"];
    },
    cursosFinalizados() {
      return this.$store.getters["cursos/finalizados"];
    },
  },
  async created() {
    await this.cargarCursos();
  },
  methods: {
    async cargarCursos() {
      await this.$store.dispatch("cursos/getActivos");
      this.$store.dispatch("cursos/getAbiertos");
      this.$store.dispatch("cursos/getFinalizados");
    },
  },
};
</script>

<style lang="less" scoped>
.campus .container {
  margin-top: 80px;
  margin-bottom: 60px;
}

h1 {
  font-weight: bold;
  font-size: 46px;
  line-height: 54px;
  margin-bottom: 40px;
  color: @daybreak-blue-10;
}
.botonera {
  width: fit-content;
  margin: 0 0 0 auto;
  position: relative;
  z-index: 1;
  button {
    margin-bottom: 5px;
  }
  @media (min-width: 768px) {
    margin-bottom: -24px;
  }
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
