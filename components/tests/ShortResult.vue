<template>
  <nuxt-link :to="link" class="short-result">
    <div class="short-result__top">
      <div class="short-result__top__title">
        <img :src="require('~/assets/icons/' + result.icon)" />
        <div>{{ result.title }}</div>
      </div>
      <div class="short-result__top__date">
        {{ $moment(result.date).format("DD.MM.YYYY") }}
      </div>
    </div>
    <ShortResultContent :result="result" />
  </nuxt-link>
</template>

<script>
import ShortResultContent from "~/components/tests/ShortResultContent";

export default {
  name: "ShortResult",
  components: {
    ShortResultContent,
  },
  props: {
    result: {
      type: Object,
      required: true,
      default: null,
    },
  },
  computed: {
    link() {
      console.log("this.result", this.result);
      const serie = this.$route.query.serie;
      const category = this.$route.query.category;
      const id = this.$route.query.id;
      if (this.result === null) {
        return `/tests/result?serie=${serie}&category=${category}&id=${id}`;
      }
      return `/tests/result?serie=${serie}&category=${category}&id=${id}&result_id=${this.result.id}`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/components/tests/short-result";
</style>
