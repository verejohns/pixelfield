<template>
  <div>
    <Modal v-if="showModal" @close="showModal = false">
      <StoreCard
        v-if="selectedCard"
        :image="selectedCard.card.image"
        :title="selectedCard.title"
        :price-coins="selectedCard.price_coins"
        :price-diamonds="selectedCard.price_diamonds"
        :is-purchased="selectedCard.is_purchased"
        :in-modal="true"
        @buy="handlePurchase(selectedCard)"
      />
    </Modal>
    <Header :title="$t('e_shop')" link="/" :link-text="$t('dashboard')" />
    <div class="store">
      <div class="store__coin-cards">
        <CoinCard
          :amount="userCurrencies('money')"
          class="store__coin-cards__card"
        />
        <CoinCard
          :amount="userCurrencies('diamond')"
          :is-coin="false"
          class="store__coin-cards__card"
        />
      </div>
      <div v-if="!cardsIsLoading" class="store__store-cards">
        <div v-for="(card, index) in cards.results" :key="`card-${index}`">
          <StoreCard
            :image="card.card.image"
            :title="card.title"
            :price-coins="card.price_coins"
            :price-diamonds="card.price_diamonds"
            :is-purchased="card.is_purchased"
            @dialog="selectCard(card)"
            @buy="handlePurchase(card)"
          />
        </div>
      </div>
      <Loading v-else />
    </div>

    <SnackBar
      v-if="snackBarMessage"
      :message="snackBarMessage"
      :is-error="snackBarError"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Modal from "~/components/ui/Modal.vue";
import Loading from "~/components/ui/Loading.vue";
import Header from "~/components/ui/Header.vue";
import CoinCard from "~/components/ui/CoinCard.vue";
import StoreCard from "~/components/store/StoreCard.vue";
export default {
  name: "Store",
  components: {
    Modal,
    Loading,
    CoinCard,
    StoreCard,
    Header,
  },
  auth: false,
  data() {
    return {
      showModal: false,
      selectedCard: null,
      snackBarMessage: null,
      snackBarError: true,
      nextRelease: this.$moment().add(2, "hours"),
    };
  },
  computed: {
    ...mapGetters({
      cards: "shop/cards",
      cardsIsLoading: "shop/cardsIsLoading",
    }),
  },
  mounted() {
    this.$store.dispatch("shop/fetchCards");
  },
  methods: {
    userCurrencies(type) {
      if (type === "money") {
        return this.$auth.user.money_count;
      } else if (type === "diamond") {
        return this.$auth.user.diamonds_count;
      } else {
        return 0;
      }
    },
    selectCard(card) {
      this.selectedCard = card;
      this.showModal = true;
    },
    handlePurchase(card) {
      this.showModal = false;
      this.$store
        .dispatch("shop/buy", card.id)
        .then((v) => {
          this.$toast.success(this.$t("success_purchase"));
          this.$store.dispatch("shop/fetchCards");
          this.$auth.fetchUser();
        })
        .catch((e) => {
          console.log(e.response.data);
          this.$toast.error(e.response.data.payload.message);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/store/store";
</style>
