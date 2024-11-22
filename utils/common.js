// String Date Convert
import { convertCamelToSnake } from "~/utils/convertCamelToSnake";
import { convertSnakeToCamel } from "~/utils/convertSnakeToCamel";

export const fromStringToDate = (date) => {
  const explodeDate = date.split(" ");
  if (explodeDate.length) {
    return {
      day: explodeDate[0],
      month: explodeDate[1],
      year: explodeDate[2],
    };
  }
};

export function fromSecondsToTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds - hours * 3600) / 60);
  for (let i = 0; i < 40; i++) {
    console.log(this.$tc("minutes", i, { count: i }));
  }
  return [
    this.$tc("hours", hours, { count: hours }),
    this.$tc("minutes", minutes, { count: minutes }),
  ].join(" ");
  // return new Date(seconds * 1000).toISOString().substr(11, 8).replace("-", ":");
}

// Email Validation as per RFC2822 standards
export const isEmail = (str) =>
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
    str
  );

export const isPhoneNumber = (str) =>
  /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/.test(
    str
  );

export const apiFunctions = {
  formData(data, files) {
    const apiData = convertSnakeToCamel(data);
    const formData = new FormData();
    if (apiData) {
      Object.keys(apiData).forEach((key) => {
        formData.append(key, apiData[key]);
      });
    }
    if (files) {
      Object.keys(files).forEach((item) =>
        formData.append(convertCamelToSnake(item), files[item])
      );
    }

    return formData;
  },
  filesHeaders() {
    return {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    };
  },
  plainHeaders() {
    return {
      Accept: "application/json",
      Authorization: null,
    };
  },
};
