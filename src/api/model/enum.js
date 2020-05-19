import axios from '@/plugin/axios';

export const ConfigMethod = function(opts) {
  return axios.get('/api/enum/configMethod', { params: opts });
};
export const PlatType = function(opts) {
  return axios.get('/api/enum/platType', { params: opts });
};
export const Terminals = function(opts) {
  return axios.get('/api/enum/terminals', { params: opts });
};
export const StreamType = function(opts) {
  return axios.get('/api/enum/streamType', { params: opts });
};
export const Clarity = function(opts) {
  return axios.get('/api/enum/clarity', { params: opts });
};
export const Format = function(opts) {
  return axios.get('/api/enum/format', { params: opts });
};
export const Status = function(opts) {
  return axios.get('/api/enum/status', { params: opts });
};
export const Factory = function(opts) {
  return axios.get('/api/enum/factory', { params: opts });
};
export const LiveLevel = function(opts) {
  return axios.get('/api/enum/liveLevel', { params: opts });
};
export const CodeLevel = function(opts) {
  return axios.get('/api/enum/codeLevel', { params: opts });
};
export const CodeStatus = function(opts) {
  return axios.get('/api/enum/codeStatus', { params: opts });
};
export const CdnStatus = function(opts) {
  return axios.get('/api/enum/cdnStatus', { params: opts });
};
