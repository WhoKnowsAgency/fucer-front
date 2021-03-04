<template>
  <ALayoutHeader class="cabecera">
    <div class="container">
      <picture>
        <source
          :srcSet="require('assets/img/fucer-azul.x2.png?webp')"
          type="image/webp"
        />
        <source
          :srcSet="require('assets/img/fucer-azul.png')"
          type="image/png"
        />
        <NuxtLink to="/">
          <img
            width="65"
            height="65"
            class="logo"
            src="~assets/img/fucer-azul.png"
            srcset="~assets/img/fucer-azul.x2.png 2x"
            alt="Logo de Fucer"
          />
        </NuxtLink>
      </picture>
      <AMenu class="menu" mode="horizontal" expand-icon="hola">
        <AMenuItem key="1">
          <NuxtLink to="/cursos"> Cursos </NuxtLink>
        </AMenuItem>
        <template v-if="$auth.loggedIn">
          <AMenuItem key="7">
            <ADropdown>
              <a href="#profile" class="avatar ant-dropdown-link">
                <AAvatar
                  size="small"
                  alt=""
                  :src="$auth.user.foto && $auth.user.foto.src"
                />
                {{ $auth.user.nombre }}
              </a>
              <AMenu id="profile" slot="overlay">
                <AMenuItem key="0">
                  <NuxtLink to="/campus"
                    ><AIcon type="home" /> Inicio
                  </NuxtLink>
                </AMenuItem>
                <AMenuItem key="2">
                  <a
                    href="#logout"
                    @click="$auth.logout()"
                    @keyup.enter="$auth.logout()"
                  >
                    <AIcon type="poweroff" /> Cerrar sesión
                  </a>
                </AMenuItem>
              </AMenu>
            </ADropdown>
          </AMenuItem>
        </template>
        <template v-else>
          <AMenuItem key="8">
            <AButton type="round">
              <NuxtLink to="/campus">Campus</NuxtLink>
            </AButton>
          </AMenuItem>
        </template>
      </AMenu>
    </div>
  </ALayoutHeader>
</template>

<script>
import { Layout, Menu, Button, Avatar, Dropdown } from "ant-design-vue";
export default {
  components: {
    ALayoutHeader: Layout.Header,
    AMenuItem: Menu.Item,
    AMenu: Menu,
    AButton: Button,
    AAvatar: Avatar,
    ADropdown: Dropdown,
  },
};
</script>

<style lang="less" scoped>
.@{layout-prefix-cls}-header {
  color: @daybreak-blue-9;
  border-bottom: 1px solid @geek-blue-2;
  .container {
    position: relative;
    padding-left: 24px + 65px + 10px;
  }
}

a {
  color: inherit;
  text-decoration: none;
}
.logo {
  position: absolute;
  left: 24px; // header padding-left
  top: 0;
}

.avatar {
  display: flex;
  align-items: center;
  color: #262626;
  .ant-avatar {
    margin-right: 5px;
  }
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
  .@{layout-prefix-cls}-header .container {
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
