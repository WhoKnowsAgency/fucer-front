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
export default {
  errorCaptured(error) {
    this.$store.dispatch("setPaginaError", error.toString());
    return false; // prevent Nuxt from handling the error
  },
};
</script>
