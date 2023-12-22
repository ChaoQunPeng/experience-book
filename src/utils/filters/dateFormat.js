import Vue from 'vue';
import dayjs from 'dayjs';


export const dateFormat = function (value, format) {
  value = dayjs(value).format(format);
  return value;
}

export const dateFormatFilter = Vue.filter('dateFormat', dateFormat);

export default dateFormatFilter;