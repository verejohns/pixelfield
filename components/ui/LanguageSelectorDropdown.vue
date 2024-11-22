<template>
  <div class="dropdown" @click="expanded = !expanded">
    <div class="dropdown__selected">
      <div class="dropdown__selected__content">
        <img
          :src="locales[selected].img"
          :alt="locales[selected].text"
          class="dropdown__selected__content__flag"
        />
        <div class="dropdown__selected__content__text">
          {{ locales[selected].text }}
        </div>
      </div>
      <img
        class="dropdown__selected__arrow"
        :class="{ expanded }"
        :src="arrowImg"
      />
    </div>
    <div v-if="expanded" class="dropdown__expand">
      <div
        v-for="(option, locale) in options"
        :key="locale"
        class="dropdown__expand__option"
        @click="changeLocale(locale)"
      >
        <img
          :src="option.img"
          :alt="option.text"
          class="dropdown__expand__option__flag"
        />
        <div class="dropdown__expand__option__text">
          {{ option.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LanguageSelectorDropdown",
  props: {
    color: {
      type: String,
      default: "white",
    },
  },
  data() {
    return {
      expanded: false,
      selected: this.$i18n.locale,
      locales: {
        en: {
          text: "English",
          img: require("~/assets/icons/flag_gb.svg"),
        },
        cs: {
          text: "Čeština",
          img: require("~/assets/icons/flag_cz.svg"),
        },
      },
    };
  },
  computed: {
    options() {
      return Object.keys(this.locales)
        .filter((key) => key !== this.selected)
        .reduce((result, key) => {
          result[key] = this.locales[key];
          return result;
        }, {});
    },
    arrowImg() {
      return this.color === "white"
        ? require("~/assets/icons/chevron-down-white.svg")
        : require("~/assets/icons/chevron-down.svg");
    },
  },
  methods: {
    changeLocale(locale) {
      this.$i18n.setLocale(locale);
      this.selected = locale;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/ui/language-selector-dropdown";
</style>
