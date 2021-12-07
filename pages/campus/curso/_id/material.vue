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
        <ABreadcrumbItem>Material</ABreadcrumbItem>
      </ABreadcrumb>
      <div>
        <h1>Material</h1>
        <ARow :gutter="[24, 24]">
          <ACol
            v-for="material in curso.materiales"
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
          <ACol
            v-for="clase in clases.filter((c) => c.materiales.length)"
            :key="`material-clase-${clase.id}`"
            span="12"
          >
            <ACard class="card" hoverable>
              <NuxtLink
                :to="`/campus/curso/${curso.id}/clase/${clase.id}/material`"
              >
                <h3>{{ clase.nombre }}</h3>
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
    const id = this.$route.params.id;
    try {
      await this.$store.dispatch("cursos/getById", id);
      this.curso = this.$store.state.cursos.byId[id];
    } catch (e) {
      console.error(e);
      if (process.client) {
        this.$router.push({ name: "404" });
        return;
      }
    }

    try {
      this.clases = await this.$api.cursos.clases(id);
    } catch (e) {
      console.error(e);
    }
  },
  data() {
    return {
      curso: {
        id: 0,
      },
      clases: [],
    };
  },
  head() {
    return {
      title: "Material - " + this.curso.nombre,
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
