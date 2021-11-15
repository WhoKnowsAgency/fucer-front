<template>
  <div class="curso">
    <div class="container">
      <ABreadcrumb>
        <ABreadcrumbItem>
          <NuxtLink to="/campus">Campus</NuxtLink>
        </ABreadcrumbItem>
        <ABreadcrumbItem>
          <NuxtLink :to="`/campus/curso/${curso_id}`"> Curso </NuxtLink>
        </ABreadcrumbItem>
        <ABreadcrumbItem>
          <NuxtLink :to="`/campus/curso/${curso_id}/material`">
            Material
          </NuxtLink>
        </ABreadcrumbItem>
        <ABreadcrumbItem>{{ clase.nombre }}</ABreadcrumbItem>
      </ABreadcrumb>
      <div>
        <h1>Material</h1>
        <ARow :gutter="[24, 24]">
          <ACol
            v-for="material in clase.materiales"
            :key="material.id"
            span="12"
          >
            <ACard class="card" hoverable>
              <a :href="material.pdf" target="_blank">
                <h3>{{ material.nombre }}</h3>
                <AButton class="btn" type="dashed" shape="circle">
                  <AIcon type="arrow-right" />
                </AButton>
              </a>
            </ACard>
          </ACol>
        </ARow>
      </div>
    </div>
  </div>
</template>

<script>
import { Button, Breadcrumb, Row, Col, Card, Icon } from "ant-design-vue";
export default {
  components: {
    AButton: Button,
    ABreadcrumb: Breadcrumb,
    ABreadcrumbItem: Breadcrumb.Item,
    ARow: Row,
    ACol: Col,
    ACard: Card,
    AIcon: Icon,
  },
  async fetch() {
    if (!this.$route.params.id) return;
    if (!this.$route.params.clase_id) return;
    this.curso_id = this.$route.params.id;
    try {
      const clases = await this.$api.cursos.clases(this.curso_id);
      this.clase =
        clases && clases.find((c) => c.id == this.$route.params.clase_id);
      if (!this.clase) {
        if (process.client) {
          this.$router.push({ name: "404" });
        }
        return;
      }
    } catch (e) {
      console.error(e);
      if (process.client) {
        this.$router.push({ name: "404" });
      }
    }
  },
  data() {
    return {
      curso_id: 0,
      clase: {
        id: 0,
        nombre: "",
      },
    };
  },
  head() {
    return {
      title: "Material - " + this.clase.nombre,
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

.intro {
  max-width: 380px;
  margin-bottom: 60px;
}

.card {
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
