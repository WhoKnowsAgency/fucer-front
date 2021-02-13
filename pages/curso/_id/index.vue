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

        <!-- eslint-disable vue/no-v-html -->
        <div
          v-if="curso.info_campus"
          class="card-info"
          v-html="curso.info_campus"
        />
        <!-- eslint-enable vue/no-v-html -->

        <ARow :gutter="[24, 24]">
          <ACol v-for="enlace in enlaces" :key="enlace.nombre" span="12">
            <ACard class="card" hoverable>
              <NuxtLink :to="enlace.to">
                <h3>{{ enlace.nombre }}</h3>
                <AButton class="btn" type="dashed" shape="circle">
                  <AIcon type="arrow-right" />
                </AButton>
              </NuxtLink>
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
    };
  },
  computed: {
    enlaces() {
      let enlaces = [];
      if (this.curso.enlace_zoom) {
        enlaces.push({
          nombre: `Acceso a Zoom`,
          to: `${this.curso.id}/zoom`,
        });
      }

      if (this.curso.materiales && this.curso.materiales.length) {
        enlaces.push({
          nombre: `Material`,
          to: `${this.curso.id}/material`,
        });
      }

      if (this.curso.clases && this.curso.clases.length) {
        enlaces.push({
          nombre: `Grabaciones`,
          to: `${this.curso.id}/grabaciones`,
        });
      }

      if (this.curso.comentarios) {
        enlaces.push({
          nombre: `Comentarios`,
          to: `${this.curso.id}/comentarios`,
        });
      }

      enlaces.push({
        nombre: `Certificado`,
        to: `${this.curso.id}/certificado`,
      });

      return enlaces;
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
  font-size: 30px;
  line-height: 38px;
  margin-top: 16px;
  margin-bottom: 20px;
  color: @daybreak-blue-10;
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
