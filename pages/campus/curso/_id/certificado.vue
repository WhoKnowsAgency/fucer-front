<template>
  <div class="curso">
    <div class="container">
      <ABreadcrumb>
        <ABreadcrumbItem>
          <NuxtLink to="/campus">Campus</NuxtLink>
        </ABreadcrumbItem>
        <ABreadcrumbItem>
          <NuxtLink :to="`/campus/curso/${curso.id}`"> Curso </NuxtLink>
        </ABreadcrumbItem>
        <ABreadcrumbItem>Certificado</ABreadcrumbItem>
      </ABreadcrumb>
      <div>
        <h1>Certificado</h1>
        <p class="intro">Visualizá o descargá el certificado de cursada.</p>
      </div>

      <template v-if="curso.certificado">
        Acá va a estar mi hermoso certificado.
      </template>
      <template v-else>
        <AEmpty>
          <div slot="description">
            <h3>Aún no se emitió tu certificado de cursada</h3>
            <p>Recibirás una notificación cuando puedas acceder.</p>
          </div>
        </AEmpty>
      </template>
    </div>
  </div>
</template>

<script>
import { Breadcrumb, Empty } from "ant-design-vue";
export default {
  components: {
    ABreadcrumb: Breadcrumb,
    ABreadcrumbItem: Breadcrumb.Item,
    AEmpty: Empty,
  },
  computed: {
    curso() {
      return this.$store.state.cursos.byId[this.$route.params.id];
    },
  },
  head() {
    return {
      title: "Certificado - " + this.curso.nombre,
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
  word-spacing: -0.3em;
  font-size: 30px;
  line-height: 38px;
  margin-top: 16px;
  margin-bottom: 20px;
  color: @daybreak-blue-10;
}

h2 {
  color: @daybreak-blue-10;
}

.intro {
  max-width: 380px;
  margin-bottom: 60px;
}

.card {
  max-width: 384px;
  background: white;
  h3 {
    font-weight: bold;
    word-spacing: -0.3em;
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
