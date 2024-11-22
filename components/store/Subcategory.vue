<template>
  <div class="subcategory">
    <div class="subcategory_details">
      <div class="subcategory_details_title">
        <img
          src="~/assets/icons/card.svg"
          :alt="name"
          class="subcategory_details_title_img"
        />
        <span class="subcategory_details_title_text">{{ name }}</span>
      </div>
      <div class="subcategory_details_count">
        {{ ownedCount }}/{{ total }} {{ $t("cards") }}
      </div>
    </div>
    <div class="subcategory-list">
      <SubcategoryCard
        v-for="card in cards"
        :key="card.id"
        :name="card.title"
        :filter-card="filterCards"
        :image="card.image"
        :unlocked="card.unlocked"
        @dialog="$emit('dialog', card)"
      />
    </div>
  </div>
</template>

<script>
import SubcategoryCard from "~/components/store/SubcategoryCard.vue";

export default {
  name: "StoreSubcategory",
  components: {
    SubcategoryCard,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    filterCards: {
      type: Boolean,
      default: false,
    },
    cards: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ownedCount() {
      return this.cards.filter((card) => card.unlocked).length;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/store/categories";
</style>
