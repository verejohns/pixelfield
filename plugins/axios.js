export default function ({ $axios, i18n }) {
  $axios.setHeader("Accept-Language", i18n.locale);
  i18n.onLanguageSwitched = () => {
    $axios.setHeader("Accept-Language", i18n.locale);
  };
}
