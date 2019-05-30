import { BaseEndpoint } from './interface-state.js';

export const HTTP_REQUEST = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
  PATCH: 'patch'
};

export const Http = {
  post: baseHttpPost,
  get: baseHttpGet,
  put: baseHttpPut,
  delete: baseHttpDelete,
  patch: baseHttpPatch,
  getDefaultJsonHeaders
};

function baseHttpPost(endpoint, headers, params, bodyData) {
  return httpJsonRequest(`${BaseEndpoint.get()}/${endpoint}`, HTTP_REQUEST.POST, headers, params, bodyData);
}

function baseHttpGet(endpoint, headers, params) {
  return httpJsonRequest(`${BaseEndpoint.get()}/${endpoint}`, HTTP_REQUEST.GET, headers, params, undefined);
}

function baseHttpPut(endpoint, headers, params, bodyData) {
  return httpJsonRequest(`${BaseEndpoint.get()}/${endpoint}`, HTTP_REQUEST.PUT, headers, params, bodyData);
}

function baseHttpPatch(endpoint, headers, params, bodyData) {
  return httpJsonRequest(`${BaseEndpoint.get()}/${endpoint}`, HTTP_REQUEST.PATCH, headers, params, bodyData);
}

function baseHttpDelete(endpoint, headers, params) {
  return httpJsonRequest(`${BaseEndpoint.get()}/${endpoint}`, HTTP_REQUEST.DELETE, headers, params, undefined);
}

function getDefaultJsonHeaders() {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
}

function httpJsonRequest(url, request, headers, params, bodyData) {
  if (!headers) {
    headers = getDefaultJsonHeaders()
  }
  url = new URL(url);
  if (params) {
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  }
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: request,
      headers: headers,
      body: JSON.stringify(bodyData)
    })
    .then(res => resolve(res.json()))
    .catch(err => reject(err))
  });
}