<template>
  <div class="image-uploader" :class="photoStyle">
    <div
      v-if="url"
      class="preview"
      :style="{ backgroundImage: 'url(' + url + ')' }"
    ></div>
    <div v-else>
      <div
        v-if="photo"
        class="preview"
        :style="{ backgroundImage: 'url(' + photo + ')' }"
      ></div>
      <div v-else class="temp-preview">
        {{ username.charAt(0) }}
      </div>
    </div>
    <input type="file" class="file" @change="onFileChange" />
    <div class="label">
      <div class="label__text">{{ uploadLabel }}</div>
      <img src="~/assets/icons/camera.svg" />
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageUploader",
  components: {},
  props: {
    photo: {
      type: String,
      required: false,
      default: "",
    },
    username: {
      type: String,
      required: false,
      default: "",
    },
    photoStyle: {
      type: String,
      required: false,
      default: "",
    },
    uploadLabel: {
      type: String,
      required: false,
      default: "Upload",
    },
    afterUpload: {
      type: Function,
      required: false,
      default: () => console.log("TODO: Make ImageUpload save function."),
    },
  },
  data() {
    return {
      url: null,
      image: null,
    };
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
      this.afterUpload(file);
    },
  },
};
</script>

<style lang="scss">
@import "/assets/scss/components/ui/image-uploader";
</style>
