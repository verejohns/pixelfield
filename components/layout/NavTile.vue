<template>
  <a
    v-if="title === 'Šachopedie'"
    :class="['nav-tile', large ? 'nav-tile__large' : '']"
    href="https://sachy-dolmen.cz/sachopedie/sachopedie-rozcestnik"
    target="_blank"
  >
    <div>
      <img
        :src="image"
        :class="[large ? 'nav-tile__large__img' : 'nav-tile__img']"
      />
    </div>
    <div class="nav-tile__text" :class="{ 'nav-tile__text__large': large }">
      {{ title }}
    </div>
  </a>
  <div
    v-else
    :class="['nav-tile', large ? 'nav-tile__large' : '']"
    @click="click"
  >
    <div>
      <div>
        <img
          :src="image"
          :class="[large ? 'nav-tile__large__img' : 'nav-tile__img']"
        />
      </div>
      <div class="nav-tile__text" :class="{ 'nav-tile__text__large': large }">
        {{ title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    large: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  computed: {
    getImage() {
      return require(this.image);
    },
  },
  methods: {
    click() {
      this.$emit("click", this.title);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/components/layout/blog-header";
</style>
