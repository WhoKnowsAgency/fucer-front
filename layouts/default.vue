<template>
  <div>
    <client-only><vue-announcer /></client-only>

    <ALayout>
      <SkipLinks />
      <ALayoutHeader>hea der</ALayoutHeader>
      <ALayout>
        <ALayoutSider>left sidebar</ALayoutSider>
        <ALayoutContent><nuxt /></ALayoutContent>
        <ALayoutSider>right sidebar</ALayoutSider>
      </ALayout>
      <ALayoutFooter><TheFooter /></ALayoutFooter>
    </ALayout>
  </div>
</template>

<script>
export default {
  errorCaptured(error) {
    this.$store.dispatch("setPaginaError", error.toString());
    return false; // prevent Nuxt from handling the error
  },
};
</script>
