import { ConfigMethod, PlatType, Terminals, StreamType, Clarity, Format, Status, Factory, LiveLevel, CodeLevel, CodeStatus, CdnStatus } from '../../../../api/model/enum';
export default {
  namespaced: true,
  state: {
    ConfigMethod: localStorage.ConfigMethod || '[]',
    PlatType: localStorage.PlatType || '[]',
    Terminals: localStorage.Terminals || '[]',
    StreamType: localStorage.StreamType || '[]',
    Clarity: localStorage.Clarity || '[]',
    Format: localStorage.Format || '[]',
    Status: localStorage.Status || '[]',
    Factory: localStorage.Factory || '[]',
    LiveLevel: localStorage.LiveLevel || '[]',
    CodeLevel: localStorage.CodeLevel || '[]',
    CodeStatus: localStorage.CodeStatus || '[]',
    CdnStatus: localStorage.CdnStatus || '[]',
  },
  getters: {
    ConfigMethod: function(state) {
      return JSON.parse(state.ConfigMethod || '[]');
    },
    PlatType: function(state) {
      return JSON.parse(state.PlatType || '[]');
    },
    Terminals: function(state) {
      return JSON.parse(state.Terminals || '[]');
    },
    StreamType: function(state) {
      return JSON.parse(state.StreamType || '[]');
    },
    Clarity: function(state) {
      return JSON.parse(state.Clarity || '[]');
    },
    Format: function(state) {
      return JSON.parse(state.Format || '[]');
    },
    Status: function(state) {
      return JSON.parse(state.Status || '[]');
    },
    Factory: function(state) {
      return JSON.parse(state.Factory || '[]');
    },
    LiveLevel: function(state) {
      return JSON.parse(state.LiveLevel || '[]');
    },
    CodeLevel: function(state) {
      return JSON.parse(state.CodeLevel || '[]');
    },
    CodeStatus: function(state) {
      return JSON.parse(state.CodeStatus || '[]');
    },
    CdnStatus: function(state) {
      return JSON.parse(state.CdnStatus || '[]');
    },
  },
  actions: {
    GetConfigMethod({ commit }) {
      ConfigMethod({}).then((data) => commit('SetConfigMethod', data));
    },
    GetPlatType({ commit }) {
      PlatType({}).then((data) => commit('SetPlatType', data));
    },
    GetTerminals({ commit }) {
      Terminals({}).then((data) => commit('SetTerminals', data));
    },
    GetStreamType({ commit }) {
      StreamType({}).then((data) => commit('SetStreamType', data));
    },
    GetClarity({ commit }) {
      Clarity({}).then((data) => commit('SetClarity', data));
    },
    GetFormat({ commit }) {
      Format({}).then((data) => commit('SetFormat', data));
    },
    GetStatus({ commit }) {
      Status({}).then((data) => commit('SetStatus', data));
    },
    GetFactory({ commit }) {
      Factory({}).then((data) => commit('SetFactory', data));
    },
    GetLiveLevel({ commit }) {
      LiveLevel({}).then((data) => commit('SetLiveLevel', data));
    },
    GetCodeLevel({ commit }) {
      CodeLevel({}).then((data) => commit('SetCodeLevel', data));
    },
    GetCodeStatus({ commit }) {
      CodeStatus({}).then((data) => commit('SetCodeStatus', data));
    },
    GetCdnStatus({ commit }) {
      CdnStatus({}).then((data) => commit('SetCdnStatus', data));
    },
  },
  mutations: {
    SetConfigMethod(state, data) {
      localStorage.setItem('ConfigMethod', JSON.stringify(data));
    },
    SetPlatType(state, data) {
      localStorage.setItem('PlatType', JSON.stringify(data));
    },
    SetTerminals(state, data) {
      localStorage.setItem('Terminals', JSON.stringify(data));
    },
    SetStreamType(state, data) {
      localStorage.setItem('StreamType', JSON.stringify(data));
    },
    SetClarity(state, data) {
      localStorage.setItem('Clarity', JSON.stringify(data));
    },
    SetFormat(state, data) {
      localStorage.setItem('Format', JSON.stringify(data));
    },
    SetStatus(state, data) {
      localStorage.setItem('Status', JSON.stringify(data));
    },
    SetFactory(state, data) {
      localStorage.setItem('Factory', JSON.stringify(data));
    },
    SetLiveLevel(state, data) {
      localStorage.setItem('LiveLevel', JSON.stringify(data));
    },
    SetCodeLevel(state, data) {
      localStorage.setItem('CodeLevel', JSON.stringify(data));
    },
    SetCodeStatus(state, data) {
      localStorage.setItem('CodeStatus', JSON.stringify(data));
    },
    SetCdnStatus(state, data) {
      localStorage.setItem('CdnStatus', JSON.stringify(data));
    },
  },
};
