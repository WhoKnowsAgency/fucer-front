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

      <div class="contenido">
        <template v-if="certificado">
          <div>
            <div class="certificado">
              <embed
                title="Certificado de cursada"
                :src="certificado"
                frameborder="0"
              />
            </div>
            <AButton
              :href="certificado"
              download
              target="_blank"
              type="primary"
              shape="round"
            >
              Descargar certificado
            </AButton>
          </div>
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
  </div>
</template>

<script>
import { Button, Breadcrumb, Empty } from "ant-design-vue";
export default {
  components: {
    AButton: Button,
    ABreadcrumb: Breadcrumb,
    ABreadcrumbItem: Breadcrumb.Item,
    AEmpty: Empty,
  },
  async fetch() {
    if (!this.$route.params.id) return;
    try {
      await this.$store.dispatch("cursos/getById", this.$route.params.id);
      this.curso = this.$store.state.cursos.byId[this.$route.params.id];
      this.certificado = await this.$api.certificados.getByCurso(
        this.$route.params.id
      );
    } catch (e) {
      console.error(e);
      if (process.client) {
        this.$router.push({ name: "404" });
      }
    }
  },
  data() {
    return {
      curso: { nombre: "" },
      certificado: "",
    };
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
  margin-bottom: 20px;
}

.contenido {
  max-width: 650px;
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

.certificado {
  width: 100%;
  height: 0;
  padding-bottom: (544/720) * 100%;
  position: relative;
  margin-bottom: 20px;
  embed {
    width: 100%;
    height: 100%;
    position: absolute;
  }
}

@media (max-width: 460px) {
  .ant-col /deep/ {
    width: 100%;
  }
}
</style>
