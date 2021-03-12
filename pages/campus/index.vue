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
            <NuxtLink to="/cursos#abiertos">
              Inscribirme a un curso
              <AIcon type="plus-circle" />
            </NuxtLink>
          </AButton>
        </div>
      </div>

      <ATabs default-active-key="activos" @change="cargarCursos">
        <ATabPane key="activos" tab="Mis cursos">
          <p v-if="cursosActivos.length === 0">No tenés cursos activos.</p>
          <masonry :cols="{ default: 4, 1070: 3, 710: 2, 400: 1 }" :gutter="10">
            <CardCurso
              v-for="curso in cursosActivos"
              :key="curso.id"
              :curso="curso"
              tipo="campus"
            />
          </masonry>
        </ATabPane>
        <ATabPane key="finalizados" tab="Cursos finalizados">
          <p v-if="cursosFinalizados.length === 0">No hay cursos finalizados</p>
          <masonry :cols="{ default: 4, 1070: 3, 710: 2, 400: 1 }" :gutter="10">
            <CardCurso
              v-for="curso in cursosFinalizados"
              :key="curso.id"
              :curso="curso"
              tipo="campus"
            />
          </masonry>
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
  text-transform: capitalize;
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
/deep/ .card {
  margin-bottom: 10px !important;
}
/deep/ .ant-tabs-nav .ant-tabs-tab-active {
  font-weight: 700;
}
</style>
