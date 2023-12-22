import Vue from 'vue';
import { APP_CONFIG } from '../config/app-config'

Vue.mixin({
  data() {
    return {
      ...APP_CONFIG
    }
  }
});