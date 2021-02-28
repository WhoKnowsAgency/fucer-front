<template>
  <ACard class="card" hoverable>
    <div class="card_content">
      <div class="fecha">
        <AIcon type="calendar" />
        {{ curso.fecha_inicio.slice(0, 10) | fecha("dd/MM") }}
      </div>
      <h3>{{ curso.nombre }}</h3>
      <p>{{ curso.descripcion_corta }}</p>
    </div>
    <AButton class="card_button" type="primary" shape="round">
      <NuxtLink :to="enlace"> Ver más </NuxtLink>
    </AButton>
  </ACard>
</template>

<script>
import { Card, Button, Icon } from "ant-design-vue";
export default {
  components: {
    ACard: Card,
    AButton: Button,
    AIcon: Icon,
  },
  props: {
    curso: {
      type: [Object],
      required: true,
    },
    tipo: {
      type: String,
      default: "publico",
    },
  },
  computed: {
    enlace() {
      return `/${this.tipo === "campus" ? "campus/" : ""}curso/${
        this.curso.id
      }`;
    },
  },
};
</script>

<style lang="less" scoped>
.card {
  background-color: white;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  /deep/ .ant-card-body {
    padding: 32px 16px;
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
    &::before,
    &::after {
      display: none !important;
    }
  }
  h3 {
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
    color: @daybreak-blue-10;
    margin: 0.7em 0;
  }
  p {
    font-size: 16px;
  }
  .fecha {
    font-size: 16px;
    line-height: 24px;
  }
  .card_button {
    width: max-content;
  }
}
</style>
