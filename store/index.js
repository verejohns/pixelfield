import { apiFunctions } from "~/utils/common";

export const actions = {
  async register(context, payload) {
    return await this.$axios.$post("/api/users/register/", payload);
  },
  async oauthGoogleLogin(context, token) {
    const headers = apiFunctions.filesHeaders();
    return await this.$axios.$post(
      `/api/users/oauth/google/?token=${token}`,
      {},
      {
        headers,
      }
    );
  },
  async sendVerifyEmail() {
    return await this.$axios.$get("/api/users/email/verify/send/");
  },
  async verifyEmail(context, token) {
    return await this.$axios.$get(`/api/users/email/verify/?token=${token}`);
  },
  async generateNewPassword(context, email) {
    return await this.$axios.$post("/api/users/password/generate/", { email });
  },
  async changePasswordWithCode(context, { code, password }) {
    return await this.$axios.$post("/api/users/password/code/", {
      code,
      new_password: password,
    });
  },
  async onBoardingSave(context, payload) {
    return await this.$axios.$patch("/api/users/detail/", payload);
  },
  async saveAvatar(context, payload) {
    const formData = apiFunctions.formData(payload.data, payload.files);
    const headers = apiFunctions.filesHeaders();
    return await this.$axios.$patch("/api/users/avatar/", formData, {
      headers,
    });
  },
  async updateProfile(context, payload) {
    return await this.$axios.$patch("/api/users/detail/", payload);
  },
};
