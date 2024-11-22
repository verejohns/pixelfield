<template>
  <div v-if="showFooter" class="footer">
    <NuxtLink :to="'/'" class="footer__title">
      <img src="~/assets/icons/logo-light.svg" />
    </NuxtLink>
    <nav class="footer__links">
      <NuxtLink to="/blog/post-list" class="footer__links__link">
        {{ $t("about_us") }}
      </NuxtLink>
      <NuxtLink to="/blog/post-list" class="footer__links__link">
        {{ $t("T_C") }}
      </NuxtLink>
      <NuxtLink to="/blog/post-list" class="footer__links__link">
        {{ $t("contact_us") }}
      </NuxtLink>
      <NuxtLink to="/blog/post-list" class="footer__links__link">
        {{ $t("e_store_footer") }}
      </NuxtLink>
      <NuxtLink to="/blog/post-list" class="footer__links__link">
        {{ $t("blog") }}
      </NuxtLink>
      <LanguageSelectorDropdown :color="color" />
    </nav>
  </div>
</template>

<script>
import LanguageSelectorDropdown from "~/components/ui/LanguageSelectorDropdown.vue";

export default {
  name: "DefaultFooter",
  components: {
    LanguageSelectorDropdown,
  },
  props: {
    color: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showFooter: true,
    };
  },
  mounted() {
    this.$nuxt.$on("hideFooter", () => {
      this.showFooter = false;
    });
    this.$nuxt.$on("showFooter", () => {
      this.showFooter = true;
    });
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/layout/default-footer";
</style>
