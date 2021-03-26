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
        <ABreadcrumbItem>
          <NuxtLink :to="`/campus/curso/${curso.id}/grabaciones`">
            Grabaciones
          </NuxtLink>
        </ABreadcrumbItem>
        <ABreadcrumbItem>{{ clase.nombre }}</ABreadcrumbItem>
      </ABreadcrumb>

      <div>
        <h1>{{ clase.nombre }}</h1>
        <div v-if="clase.id_vimeo" class="iframe">
          <iframe
            :title="clase.nombre"
            :src="`https://player.vimeo.com/video/${clase.id_vimeo}?title=0&byline=0&portrait=0`"
            style="
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
            "
            frameborder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            webkitallowfullscreen
            mozallowfullscreen
            allowfullscreen
          ></iframe>
        </div>
        <div v-else>
          <AEmpty>
            <div slot="description">
              <h3>Aún no se cargó una grabación de esta clase.</h3>
            </div>
          </AEmpty>
        </div>
      </div>
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
  computed: {
    clase() {
      return this.curso.clases.filter(
        (c) => c.id == this.$route.params.clase_id
      )[0];
    },
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
  word-spacing: -0.3em;
  font-size: 30px;
  line-height: 38px;
  margin-top: 16px;
  margin-bottom: 20px;
  color: @daybreak-blue-10;
}

.iframe {
  padding: 56.25% 0 0 0;
  position: relative;
  margin-top: 40px;
}
</style>
