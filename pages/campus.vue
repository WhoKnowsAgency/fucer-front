<template>
  <div class="campus">
    <div class="container">
      <div>
        <h1>
          Hola,<br />
          {{ $auth.user.nombre }}
        </h1>

        <div class="botonera">
          <AButton type="dashed" shape="default" size="small">
            Inscribirme a un curso
            <AIcon type="plus-circle" />
          </AButton>

          <AButton
            :loading="status === 'pending'"
            type="primary"
            size="small"
            @click="$auth.logout()"
            @keyup.enter="$auth.logout()"
          >
            Cerrar sesión
          </AButton>
        </div>
      </div>

      <ATabs default-active-key="activos" @change="cargarCursos">
        <ATabPane key="activos" tab="Cursos activos">
          <p v-if="cursos.length === 0">No tenés cursos activos.</p>
          <ACard v-for="curso in cursos" :key="curso.id" class="card" hoverable>
            <h3>{{ curso.nombre }}</h3>
            <AButton class="btn" type="primary" shape="round">
              <NuxtLink to="/curso">
                Abrir <AIcon type="arrow-right" />
              </NuxtLink>
            </AButton>
          </ACard>
        </ATabPane>
        <ATabPane key="finalizados" tab="Cursos finalizados">
          <p v-if="cursos.length === 0">No tenés cursos finalizados.</p>
          <ACard v-for="curso in cursos" :key="curso.id" class="card" hoverable>
            <h3>{{ curso.nombre }}</h3>
            <AButton class="btn" type="primary" shape="round">
              <NuxtLink to="/curso">
                Abrir <AIcon type="arrow-right" />
              </NuxtLink>
            </AButton>
          </ACard>
        </ATabPane>
      </ATabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cursos: [],
    };
  },
  async created() {
    this.cursos = await this.cargarCursos("activos");
  },
  methods: {
    async cargarCursos(activeKey) {
      const finalizados = activeKey === "finalizados";
      this.cursos = await this.$api.cursos.usuario(finalizados);
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
  margin-bottom: 46px;
  color: @daybreak-blue-10;
}
.botonera {
  width: fit-content;
  margin: 0 0 0 auto;
  button {
    margin-bottom: 5px;
  }
}

/deep/ .ant-tabs-content {
  padding-top: 40px;
}
/deep/ .ant-tabs-nav .ant-tabs-tab-active {
  font-weight: 700;
}
.card {
  max-width: 384px;
  h3 {
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
    color: @daybreak-blue-10;
  }
  .btn {
    margin-top: 17px;
  }
}
</style>
