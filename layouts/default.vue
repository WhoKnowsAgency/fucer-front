<template>
  <div>
    <client-only><vue-announcer /></client-only>

    <ALayout>
      <SkipLinks />
      <TheHeader />

      <ALayout>
        <ALayoutContent><nuxt /></ALayoutContent>
      </ALayout>

      <TheFooter />
    </ALayout>
  </div>
</template>

<script>
import { Layout } from "ant-design-vue";
export default {
  components: {
    ALayout: Layout,
    ALayoutContent: Layout.Content,
  },
  errorCaptured(error) {
    this.$store.dispatch("setPaginaError", error.toString());
    return false; // prevent Nuxt from handling the error
  },
};
</script>
