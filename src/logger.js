export const LOG_LEVEL = {
  DEBUG: 'debug',
  INFO: 'info',
  ERROR: 'error'
};

function getLogLevel() {
  return currentLogLevel;
}

function setLogLevel(logLevel) {
  switch (interfaceState) {
    case LOG_LEVEL.DEBUG, LOG_LEVEL.INFO, LOG_LEVEL.ERROR:
    currentLogLevel = logLevel;
      return;
    default:
      throw new Error(`Invalid log level: ${logLevel}`);
  }
}

export const Log = {
  debug: logDebug,
  info: logInfo,
  error: logError,
  getLogLevel,
  setLogLevel
}

let currentLogLevel = LOG_LEVEL.DEBUG;

function logDebug(message) {
  if (Log.getLogLevel() === LOG_LEVEL.DEBUG) {
    console.log(_freezeMessage(message));
  }
}

function logInfo(message) {
  if (Log.getLogLevel() === LOG_LEVEL.DEBUG || Log.getLogLevel() === LOG_LEVEL.INFO) {
    console.log(_freezeMessage(message));
  }
}

function logError(message) {
  console.error(_freezeMessage(message));
}

function _freezeMessage(message) {
  return JSON.parse(JSON.stringify(message));
}