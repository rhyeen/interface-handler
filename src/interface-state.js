export const INTERFACE = {
  HTTP: 'http',
  MOCK: 'mock'
};

export const RUN_ENV = {
  LOCAL: 'local',
  PRODUCTION: 'prod'
};

export const BaseEndpoint = {
  localBaseEndpoint: '',
  prodBaseEndpoint: '',
  getBaseEndpoint,
  setLocalBaseEndpoint,
  setProdBaseEndpoint
};

export const interfaceState = () => {
  return INTERFACE.HTTP;
};

export const invalidInterfaceState = () => {
  return new Error(`Invalid interface state: ${interfaceState()}`);
};

export const runState = () => {
  return RUN_ENV.LOCAL;
};

function getBaseEndpoint() {
  switch (runState()) {
    case RUN_ENV.LOCAL:
      return baseEndpoints.localBaseEndpoint;
    case RUN_ENV.PRODUCTION:
      return baseEndpoints.prodBaseEndpoint;
    default:
      return new Error(`Invalid run state: ${runState()}`);
  }
};

function setLocalBaseEndpoint(baseEndpoint) {
  baseEndpoints.localBaseEndpoint = baseEndpoint;
}

function setProdBaseEndpoint(baseEndpoint) {
  baseEndpoints.prodBaseEndpoint = baseEndpoint;
}