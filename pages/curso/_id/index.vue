<template>
  <div class="curso">
    <div class="container">
      <ABreadcrumb>
        <ABreadcrumbItem>
          <NuxtLink to="/campus">Campus</NuxtLink>
        </ABreadcrumbItem>
        <ABreadcrumbItem>
          <NuxtLink to="/campus#activos">Cursos activos</NuxtLink>
        </ABreadcrumbItem>
        <ABreadcrumbItem>Curso</ABreadcrumbItem>
      </ABreadcrumb>
      <div>
        <h1>{{ curso.nombre }}</h1>
        <ARow :gutter="[24, 24]">
          <ACol v-for="enlace in enlaces" :key="enlace.nombre" span="12">
            <ACard class="card" hoverable>
              <h3>{{ enlace.nombre }}</h3>
              <AButton class="btn" type="dashed" shape="circle">
                <NuxtLink :to="enlace.to">
                  <AIcon type="arrow-right" />
                </NuxtLink>
              </AButton>
            </ACard>
          </ACol>
        </ARow>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
      enlaces: [
        {
          nombre: `Acceso a Zoom`,
          to: `zoom`,
        },
        {
          nombre: `Material`,
          to: `material`,
        },
        {
          nombre: `Grabaciones`,
          to: `grabaciones`,
        },
        {
          nombre: `Comentarios`,
          to: `comentarios`,
        },
        {
          nombre: `Certificado`,
          to: `certificado`,
        },
      ],
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
.curso .container {
  margin-top: 55px;
  margin-bottom: 200px;
}

h1 {
  font-weight: bold;
  font-size: 30px;
  line-height: 38px;
  margin-top: 16px;
  margin-bottom: 60px;
  color: @daybreak-blue-10;
}

.card {
  max-width: 384px;
  background: white;
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

@media (max-width: 460px) {
  .ant-col /deep/ {
    width: 100%;
  }
}
</style>
