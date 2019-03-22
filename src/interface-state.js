export const InterfaceState = {
  get: getInterfaceState,
  set: setInterfaceState,
  invalid: invalidInterfaceState
};

export const INTERFACE_STATE = {
  HTTP: 'http',
  MOCK: 'mock'
};

export const RunState = {
  get: getRunState,
  set: setRunState
};

export const RUN_STATE = {
  LOCAL: 'local',
  PRODUCTION: 'prod'
};

export const BaseEndpoint = {
  localBaseEndpoint: '',
  prodBaseEndpoint: '',
  get: getBaseEndpoint,
  setLocalBaseEndpoint,
  setProdBaseEndpoint
};

let currentInterfaceState = INTERFACE_STATE.MOCK;
let currentRunState = RUN_STATE.LOCAL;

function getInterfaceState() {
  return currentInterfaceState;
};

function setInterfaceState(interfaceState) {
  switch (interfaceState) {
    case INTERFACE_STATE.HTTP:
    case INTERFACE_STATE.MOCK:
      currentInterfaceState = interfaceState;
      return;
    default:
      throw new Error(`Invalid interface state: ${interfaceState}`);
  }
}

function invalidInterfaceState() {
  return new Error(`Invalid interface state: ${getInterfaceState()}`);
};

function getRunState() {
  return currentRunState;
};

function setRunState(runState) {
  switch (runState) {
    case RUN_STATE.LOCAL:
    case RUN_STATE.PRODUCTION:
      currentRunState = runState;
      return;
    default:
      throw new Error(`Invalid run state: ${runState}`);
  }
}

function getBaseEndpoint() {
  switch (getRunState()) {
    case RUN_STATE.LOCAL:
      return BaseEndpoint.localBaseEndpoint;
    case RUN_STATE.PRODUCTION:
      return BaseEndpoint.prodBaseEndpoint;
    default:
      throw new Error(`Invalid run state: ${getRunState()}`);
  }
};

function setLocalBaseEndpoint(baseEndpoint) {
  BaseEndpoint.localBaseEndpoint = baseEndpoint;
}

function setProdBaseEndpoint(baseEndpoint) {
  BaseEndpoint.prodBaseEndpoint = baseEndpoint;
}