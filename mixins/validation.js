import { isEmail, isPhoneNumber } from "~/utils/common";

export default {
  data() {
    return {
      password: "",
      repeatPassword: "",
      rules: {
        required: (value) => !!value || this.$t("field_required"),
        max_32: (value) => value.length <= 32 || this.$t("max_32_chars"),
        max_24: (value) => value.length <= 24 || this.$t("max_24_chars"),
        min_2: (value) => value.length >= 2 || this.$t("min_2_chars"),
        onlyNumbers: (value) =>
          /^[0-9 ]+$/.test(value) || this.$t("only_numbers"),
        passwordMatch: (value) =>
          this.password === value || this.$t("password_missmatch"),
        email: (value) => isEmail(value) || this.$t("invalid_email"),
        phone: (value) => isPhoneNumber(value) || this.$t("invalid_phone"),
      },
    };
  },
};
