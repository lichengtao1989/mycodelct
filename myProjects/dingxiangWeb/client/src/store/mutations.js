import * as types from './mutation-types'

const mutations = {
  [types.SET_LOGINSHOW](state, loginShow) {
    state.loginShow = loginShow;
  },
  [types.SET_COMPANY](state, company) {
    state.company = company;
  },
  [types.SET_SYSTEMID](state, systemId) {
    state.systemId = systemId;
  },
  [types.SET_VIDEOSRC](state, videosrc) {
    state.videosrc = videosrc;
  },
  [types.SET_VIDEOFLAG](state, videoflag) {
    state.videoflag = videoflag;
  }
};

export default mutations