<template>
  <CursoPublico
    :titulo="curso.nombre"
    :volver="{
      to: '/cursos',
      text: 'Volver a cursos',
    }"
  >
    <template #cabecera>
      <div class="info">
        <div class="fecha">
          <AIcon type="calendar" />
          {{ curso.fecha_inicio.slice(0, 10) | fecha("dd/MM") }}
        </div>
        <p>{{ curso.descripcion_corta }}</p>
        <AButton
          v-if="curso.estado === 'abierto'"
          shape="round"
          type="primary"
          block
        >
          <NuxtLink :to="`/curso/${curso.id}/inscripcion`">
            Inscribirme
          </NuxtLink>
        </AButton>
        <p class="aclaracion">
          Para inscribirte tenés que acceder al campus con tu cuenta
        </p>
      </div>
    </template>

    <template #cuerpo>
      <div class="curso_temario" v-html="curso.temario"></div>
    </template>
  </CursoPublico>
</template>

<script>
import { Button, Icon } from "ant-design-vue";
export default {
  auth: false,
  components: {
    AButton: Button,
    AIcon: Icon,
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
      title: this.curso.nombre,
    };
  },
};
</script>

<style lang="less" scoped>
.info {
  width: 384px;
  max-width: 100%;
  border: 1px solid #224b8e;
  border-radius: 10px;
  padding: 24px;
  flex: 1 0 auto;
  align-self: flex-end;
  @media (min-width: 500px) {
    max-width: 384px;
  }
  @media (min-width: 768px) {
    align-self: auto;
  }
  .fecha {
    font-size: 16px;
    line-height: 24px;
  }
  .aclaracion {
    text-align: center;
    font-style: italic;
    font-size: 12px;
    line-height: 1.4;
  }
  p {
    font-size: 16px;
    line-height: 24px;
    margin: 16px 0;
    color: #595959;
  }
}
</style>
<style lang="less">
.curso_temario {
  padding: 32px 24px;
  h2 {
    font-weight: bold;
    font-size: 24px;
    line-height: 32px;
    color: @daybreak-blue-10;
  }
  p {
    font-size: 16px;
    line-height: 24px;
    color: #595959;
  }
}
</style>
