<template>
  <div class="search-students">
    <v-autocomplete
      v-model="select"
      :items="filteredCoaches"
      :item-text="'display_name'"
      return-object
      :search-input.sync="search"
      cache-items
      class="mx-4"
      flat
      hide-no-data
      hide-details
      :label="$t('find_coaches')"
      solo-inverted
      @change="itemChange"
    ></v-autocomplete>
    <img src="~/assets/icons/search-black.svg" class="search-students__icon" />
  </div>
</template>

<script>
export default {
  name: "SearchCoaches",
  data() {
    return {
      searchTimeout: null,
      filteredCoaches: [],
      search: null,
      select: null,
      coaches: [],
    };
  },
  watch: {
    select(val) {
      if (val) {
        this.$emit("coach-selected", val);
      }
    },
    search(val) {
      val && val !== this.select && this.querySelections(val);
    },
  },
  async mounted() {
    this.filteredCoaches = await this.$store.dispatch("coach/getCoaches");
  },
  methods: {
    querySelections(v) {
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(async () => {
        this.filteredCoaches = await this.$store.dispatch(
          "coach/getCoaches",
          v
        );
      }, 500);
    },
    itemChange() {
      this.$nextTick(() => {
        this.search = "";
        this.select = null;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/components/coach/search-students";
</style>
