import Vue from 'vue';
import { tools } from './utils'

const expFormatFunc = (value, key) => {
  const data = { ...tools.getPhaseInfo(value) };
  return data[key];
}

export const expFormat = Vue.filter('expFormat', expFormatFunc);