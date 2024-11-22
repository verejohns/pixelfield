<template>
  <div>
    <Header :title="$t('collection')" link="/" :link-text="$t('dashboard')" />
    <div>
      <Container>
        <MyCards :count="fetchCards" @input="toggleCheckBox" />
      </Container>
      <hr class="line" />
      <Container class="categories">
        <div v-if="!sectionsIsLoading" class="categories_cards">
          <div v-for="section in sections.results" :key="section.id">
            <CategoryCard
              v-if="shouldShowCategory(section.categories)"
              :link="`/store/section/${section.id}`"
              :image="section.image"
              :name="section.name"
              :cards-count="section.cards_count"
              class="categories_cards_card"
              :categories-count="section.categories.length"
            />
          </div>
        </div>
        <Loading v-else :show-background="false" class="view-loading-margin" />
      </Container>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Header from "~/components/ui/Header.vue";
import Container from "~/components/ui/Container.vue";
import MyCards from "~/components/store/MyCards.vue";
import CategoryCard from "~/components/store/CategoryCard.vue";
import Loading from "~/components/ui/Loading.vue";

export default {
  name: "Collection",
  components: {
    Header,
    Loading,
    Container,
    MyCards,
    CategoryCard,
  },
  data() {
    return {
      showOnlyOwned: false,
    };
  },
  computed: {
    ...mapGetters({
      sections: "collection/sections",
      sectionsIsLoading: "collection/sectionsIsLoading",
    }),
    fetchCards() {
      const user = this.$auth.user;
      return user.bought_cards.length + user.unlocked_cards.length;
    },
    doesSectionContainOwnedCards() {
      return (categories) => {
        for (let i = 0; i < categories.length; i++) {
          for (let j = 0; j < categories[i].cards.length; j++) {
            if (categories[i].cards[j].unlocked === true) {
              return true;
            }
          }
        }
        return false;
      };
    },
    shouldShowCategory() {
      return (categories) => {
        return this.showOnlyOwned
          ? this.doesSectionContainOwnedCards(categories)
          : true;
      };
    },
  },
  mounted() {
    this.$store.dispatch("collection/fetchSections").then((v) => {
      const categoryList = [];
      for (let i = 0; i < this.sections.results.length; i++) {
        categoryList.push({
          id: this.sections.results[i].id,
          name: this.sections.results[i].name,
        });
      }
      this.$store.commit("collection/setCategoryList", categoryList);
    });
  },
  methods: {
    toggleCheckBox(value) {
      console.log(value);
      this.showOnlyOwned = value;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/store/collection";
</style>
