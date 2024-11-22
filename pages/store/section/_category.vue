<template>
  <div :class="showModal ? 'prevent-scroll' : ''">
    <Header
      :title="$t('collection')"
      link="/store/collection"
      :link-text="$t('dashboard')"
    />
    <Modal v-if="showModal" @close="showModal = false">
      <SubcategoryCard
        v-if="selectedCard"
        :name="selectedCard.name"
        :image="selectedCard.image"
        :unlocked="selectedCard.unlocked"
      />
    </Modal>
    <Container class="categories">
      <div class="mr-24-desktop">
        <MyCards
          v-model="showOnlyOwned"
          :count="fetchCards"
          class="hide-on-mobile"
        />
        <div class="categories_checkbox hide-on-desktop mb-24">
          <input
            id="show-only-owned2"
            v-model="showOnlyOwned"
            class="categories_checkbox_box mr-16"
            type="checkbox"
          />
          <label for="show-only-owned2" class="categories_checkbox_label">
            {{ $t("show_only_owned") }}
          </label>
          <hr class="line mt-73" />
        </div>
        <CategoryList :list="fetchSections" />
      </div>
      <div class="categories_subcategories">
        <div v-for="sub in section.categories" :key="sub.id">
          <Subcategory
            v-if="sub.cards.length && shouldShowCards(sub)"
            :name="sub.name"
            :cards="sub.cards"
            :total="sub.cards.length"
            :filter-cards="showOnlyOwned"
            @dialog="handleDialog"
          />
        </div>
      </div>
    </Container>
  </div>
</template>

<script>
import Header from "~/components/ui/Header.vue";
import Container from "~/components/ui/Container.vue";
import MyCards from "~/components/store/MyCards.vue";
import CategoryList from "~/components/store/CategoryList.vue";
import Modal from "~/components/ui/Modal.vue";

export default {
  name: "StoreCategories",
  components: {
    Header,
    Container,
    MyCards,
    CategoryList,
    Modal,
  },
  data() {
    return {
      showModal: false,
      showOnlyOwned: false,
      selectedCard: null,
    };
  },
  computed: {
    section() {
      return this.$store.state.collection.sections
        ? Object.assign(
            {},
            ...this.$store.state.collection.sections.results.filter(
              (obj) => obj.id === Number(this.$route.params.category)
            )
          )
        : "";
    },
    fetchCards() {
      const user = this.$auth.user;
      return user.bought_cards.length + user.unlocked_cards.length;
    },
    fetchSections() {
      return this.$store.state.collection.categoryList;
    },
    doesSectionContainOwnedCards() {
      return (category) => {
        for (let i = 0; i < category.cards.length; i++) {
          if (category.cards[i].unlocked === true) {
            return true;
          }
        }
        return false;
      };
    },
    shouldShowCards() {
      return (category) => {
        return this.showOnlyOwned
          ? this.doesSectionContainOwnedCards(category)
          : true;
      };
    },
  },
  methods: {
    handleDialog(card) {
      console.log(card);
      this.selectedCard = card;
      this.showModal = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/store/categories";
</style>
