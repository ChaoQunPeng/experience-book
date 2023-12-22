/*
 * @Author: PengChaoQun 1152684231@qq.com
 * @Date: 2023-11-15 21:02:37
 * @LastEditors: PengChaoQun 1152684231@qq.com
 * @LastEditTime: 2023-12-21 23:29:17
 * @FilePath: /experience-book/src/store/index.js
 * @Description: 
 */
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    skillList: []
  },
  mutations: {
    setSkillList(state, payload) {
      state.skillList = [];
      state.skillList = payload.skillList;
    }
  },
  getters: {
    // 还能这么写
    getSkillById: state => id => {
      return state.skillList.find(skill => skill.SkillId);
    }
  }
});

export { store };
