<template>
  <div class="onboarding">
    <v-card class="card">
      <v-card-title class="card__title">
        <h1 class="card__title__content">{{ $t("welcome") }}</h1>
      </v-card-title>
      <v-card-text class="form">
        <v-form>
          <div class="form__title">{{ $t("finish_profile") }}</div>
          <div class="form__input photo">
            <div class="form__input__label">
              {{ $t("profile_picture") }}
              <span class="form__input__label__optional">{{
                $t("optional_bracket")
              }}</span>
            </div>
            <ImageUploader
              :after-upload="saveAvatar"
              :upload-label="'Nahrát'"
            />
          </div>
          <div class="form__input">
            <div class="form__input__label">{{ $t("username") }}</div>
            <v-text-field
              v-model="username"
              :label="$t('username')"
              :rules="[unique]"
              class="form__input__field"
              autocomplete="new-password"
              outlined
            />
          </div>
          <div class="form__input role">
            <div class="form__input__label">{{ $t("you_register_as") }}</div>
            <div class="form__input__field-group">
              <RoleButton
                :selected="role === 'user'"
                :label="'student'"
                @click="setRole('user')"
              />
              <RoleButton
                :selected="role === 'coach'"
                :label="'coach'"
                @click="setRole('coach')"
              />
            </div>
          </div>
          <div class="form__input level">
            <div class="form__input__label level">
              {{ $t("choose_your_level") }}
            </div>
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
          <v-btn
            depressed
            color="primary"
            class="form__input__button"
            :class="isFilled ? 'selected' : ''"
            @click="saveProfile"
          >
            {{ $t("continue") }}
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import LevelButton from "~/components/ui/buttons/LevelButton";
import RoleButton from "~/components/ui/buttons/RoleButton";
import ImageUploader from "~/components/ui/ImageUploader";

export default {
  name: "Onboarding",
  components: {
    LevelButton,
    ImageUploader,
    RoleButton,
  },
  auth: false,
  data() {
    return {
      level: "",
      role: "",
      username: "",
      usernameError: false,
    };
  },
  computed: {
    isFilled() {
      return this.username !== "" && this.role !== "" && this.level !== "";
    },
    unique() {
      return this.usernameError ? this.$t("username_used") : true;
    },
  },
  mounted() {
    window.onpopstate = (event) => {
      this.$router.push("/onboarding");
    };
  },
  methods: {
    setLevel(level) {
      this.level = level;
    },
    setRole(role) {
      this.role = role;
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
    saveProfile() {
      this.$store
        .dispatch("onBoardingSave", {
          role: this.role,
          level: this.level,
          email: this.$auth.user.email,
          username: this.username,
        })
        .then(() => {
          this.$auth.fetchUser();
          setTimeout(() => this.$router.push("/"), 100);
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
@import "/assets/scss/pages/onboarding";
</style>
