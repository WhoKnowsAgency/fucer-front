<template>
  <ALayoutHeader class="cabecera">
    <picture>
      <source
        :srcSet="require('assets/img/fucer-azul.x2.png?webp')"
        type="image/webp"
      />
      <source :srcSet="require('assets/img/fucer-azul.png')" type="image/png" />
      <img
        width="65"
        height="65"
        class="logo"
        src="~assets/img/fucer-azul.png"
        srcset="~assets/img/fucer-azul.x2.png 2x"
        alt="Logo de Fucer"
      />
    </picture>
    <AMenu class="menu" mode="horizontal" expand-icon="hola">
      <AMenuItem key="1">Cursos</AMenuItem>
      <AMenuItem key="3">Institucional</AMenuItem>
      <AMenuItem key="4">Publicaciones</AMenuItem>
      <AMenuItem key="5">Contacto</AMenuItem>
      <AMenuItem key="6"><AButton>Campus</AButton></AMenuItem>
    </AMenu>
  </ALayoutHeader>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.@{layout-prefix-cls}-header {
  color: @daybreak-blue-9;
  position: relative;
}

a {
  color: inherit;
  text-decoration: none;
}
.logo {
  position: absolute;
  left: 50px; // header padding-left
  top: 20px; // header padding-top
}

.@{menu-prefix-cls} {
  &-horizontal {
    border-bottom: 0;
    > .@{menu-prefix-cls}-item,
    > .@{menu-prefix-cls}-submenu {
      border-bottom: 0;
      &:hover,
      &-active,
      &-open,
      &-selected {
        border-bottom: 0;
      }
    }
  }
}

@media (min-width: @screen-md-min) {
  .@{layout-prefix-cls}-header {
    color: @daybreak-blue-9;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .logo {
    float: none;
    margin-right: 0;
  }
}
</style>
