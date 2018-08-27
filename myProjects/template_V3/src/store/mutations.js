import * as types from './mutation-types'

const mutations = {
  [types.SET_CORPINFO](state, corpInfo) {
    state.corpInfo = corpInfo
  },
  [types.SET_CUSTOMINFO](state, customInfo) {
    state.customInfo = customInfo
  },
  [types.SET_POORINFO](state, poorInfo) {
    state.poorInfo = poorInfo
  },
  [types.SET_PRODUCTBATCH_TRACENODEINFO](state, productTraceNodeInfo) {
    state.productTraceNodeInfo = productTraceNodeInfo
  },
  [types.SET_BLOCK_CHAININFO](state, blockChainInfo) {
    state.blockChainInfo = blockChainInfo
  },
  [types.SET_ANT_FAKEINFO](state, antiFakeInfo) {
    state.antiFakeInfo = antiFakeInfo
  },
}

export default mutations