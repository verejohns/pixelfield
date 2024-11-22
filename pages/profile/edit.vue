<template>
  <div class="profile-edit">
    <v-card class="card">
      <v-card-title>
        <h1 class="card__title">Upravit profil</h1>
      </v-card-title>
      <v-card-text class="form">
        <v-form>
          <div class="form__photo">
            <ImageUploader
              :photo="user.avatarUrl"
              :username="user.fullname"
              :after-upload="saveAvatar"
              photo-style="profile--edit"
              upload-label="Nahrát jiný"
            />
          </div>
          <div class="profile-edit__account">
            <div class="profile-edit__account__title">Tvůj účet</div>
            <v-text-field
              v-model="user.username"
              class="profile-edit__account__field"
              :label="$t('username')"
              :rules="[unique]"
              outlined
            />
            <v-text-field
              v-model="user.fullname"
              class="profile-edit__account__field"
              :label="$t('full_name')"
              outlined
            />
            <v-text-field
              v-model="user.email"
              class="profile-edit__account__field"
              label="Email"
              outlined
            />
          </div>
          <div class="profile-edit__change-password">
            <router-link
              :to="{ name: 'forgot-password' }"
              class="profile-edit__change-password__link"
            >
              <div class="profile-edit__change-password__link__label">
                Změnit heslo
              </div>
              <img src="~/assets/icons/lock.svg" />
            </router-link>
          </div>
          <div class="profile-edit__level">
            <div class="profile-edit__level__label">Na jaké jsi úrovni?</div>
            <LevelButton
              :selected="level === 'beginner'"
              :label="$t('easy')"
              @click="setLevel('beginner')"
            />
            <LevelButton
              :selected="level === 'intermediate'"
              :label="$t('medium')"
              @click="setLevel('intermediate')"
            />
            <LevelButton
              :selected="level === 'advanced'"
              :label="$t('hard')"
              @click="setLevel('advanced')"
            />
          </div>
          <div class="profile-edit__settings">
            <div class="profile-edit__settings__label">Nastavení</div>
            <div class="profile-edit__settings__moves">
              <div class="profile-edit__settings__moves__label">
                Zobrazovat možné tahy
              </div>
              <v-app class="profile-edit__settings__moves__switch">
                <v-switch v-model="moves" color="success"></v-switch>
              </v-app>
            </div>
          </div>
          <div class="profile-edit__button">
            <v-btn
              depressed
              color="primary"
              class="profile-edit__button__button"
              :class="level ? 'selected' : ''"
              @click="updateProfile"
            >
              Uložit
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import LevelButton from "~/components/ui/buttons/LevelButton";
import ImageUploader from "~/components/ui/ImageUploader";

export default {
  name: "EditProfile",
  components: {
    LevelButton,
    ImageUploader,
  },
  data() {
    return {
      user: {
        fullname: this.$auth.user.full_name,
        username: this.$auth.user.username,
        email: this.$auth.user.email,
        avatarUrl: this.$auth.user.avatar,
      },
      level: this.$auth.user.level,
      moves: this.$auth.user.show_moves,
      usernameError: false,
    };
  },
  computed: {
    unique() {
      return this.usernameError ? this.$t("username_used") : true;
    },
  },
  methods: {
    setLevel(level) {
      this.level = level;
    },
    saveAvatar(file) {
      this.$store
        .dispatch("saveAvatar", {
          data: {},
          files: {
            avatar: file,
          },
        })
        .catch(() => this.$toast.error(this.$t("avatar_image_upload_error")));
    },
    updateProfile() {
      this.usernameError = false;
      console.log(this.moves);
      this.$store
        .dispatch("updateProfile", {
          username: this.user.username,
          full_name: this.user.fullname,
          email: this.user.email,
          level: this.level,
          show_moves: this.moves,
        })
        .then(() => {
          this.$auth.fetchUser();
          setTimeout(() => this.$router.back(), 100);
        })
        .catch((err) => {
          try {
            if (err.response.data.payload.message === "username_unique") {
              this.usernameError = true;
            }
          } catch (e) {}
          this.$toast.error(this.$t("profile_save_error"));
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/pages/profile/profile-edit";
</style>
