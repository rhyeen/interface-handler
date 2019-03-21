import { baseEndpoint } from './interface-state.js';

export const HTTP_REQUEST = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete'
};

export const Http = {
  post: baseHttpPost,
  get: baseHttpGet,
  defaultJsonHeaders
};

function baseHttpPost(endpoint, headers, params, bodyData) {
  return httpJsonRequest(`${baseEndpoint()}/${endpoint}`, HTTP_REQUEST.POST, headers, params, bodyData);
}

function baseHttpGet(endpoint, headers, params) {
  return httpJsonRequest(`${baseEndpoint()}/${endpoint}`, HTTP_REQUEST.GET, headers, params, null);
}

function defaultJsonHeaders() {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
}

function httpJsonRequest(url, request, headers, params, bodyData) {
  if (!headers) {
    headers = defaultJsonHeaders()
  }
  url = new URL(url);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
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