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
        <ABreadcrumbItem>Acceso a Zoom</ABreadcrumbItem>
      </ABreadcrumb>
      <div>
        <h1>Acceso a Zoom</h1>
        <p class="intro">
          En esta página podés consultar los accesos al Zoom del curso.
          <template v-if="curso.enlace_instructivo"
            >Si lo necesitás, podés también ver el
            <a :href="curso.enlace_instructivo">instructivo</a> en caso de que
            nunca hayas usado Zoom.
          </template>
        </p>

        <p class="card-info">
          - Podés acceder al aula virtual de Zoom
          <a :href="curso.enlace_zoom">en este link</a><br />
          <template v-if="curso.id_zoom">
            - Podés acceder también ingresando a Zoom, y luego colocando el ID
            {{ curso.id_zoom }}<br />
          </template>
          <template v-if="curso.clave_zoom">
            - La clave para ingresar es
            <strong>{{ curso.clave_zoom }}</strong>
          </template>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { Breadcrumb } from "ant-design-vue";
export default {
  components: {
    ABreadcrumb: Breadcrumb,
    ABreadcrumbItem: Breadcrumb.Item,
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
      title: "Acceso a Zoom - " + this.curso.nombre,
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

.intro {
  max-width: 380px;
  margin-bottom: 60px;
}

.card-info {
  padding: 24px;
  margin-bottom: 24px;
  color: @daybreak-blue-10;
  border: 1px solid #e8e8e8;
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
