import _ from "lodash";
import FormData from "form-data";

export const HttpMethod = {
  GET: "GET",
  POST: "POST",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

const JSON_HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export default function callApi(endpoint, method = HttpMethod.GET, body, additionalHeaders) {
  if (!endpoint) throw new Error("Endpoint missing!");

  // ToDo: wenn body === instaceof FormData ist e.g. File-Upload müssen andere Headers gesetzt werden
  // const headers = !(body instanceof FormData) && _.assign({}, JSON_HEADERS);
  const headers =
    body instanceof FormData
      ? _.assign({}, additionalHeaders)
      : _.assign({}, JSON_HEADERS, additionalHeaders);

  if (body != null && !(body instanceof FormData)) body = JSON.stringify(body);

  const init = { method, headers, body };

  return fetch(endpoint, init)
    .then((response) => {
      if (response.ok) {
        // Return body parsed as JSON when response content-type is application/json
        if (hasContentTypeJSON(response)) {
          return response.json().then((json) => json);
        }
        // Request is unfulfilled so we are rejecting with an object from the server
        // e.g. wrong mysql user privileges, wrong mysql password or any other error caused by the api
        else if (hasContentTypeProblemJSON(response)) {
          return response.json().then((json) => Promise.reject({ code: json.code, msg: json.msg }));
        }
        // Return response object
        else return response;
      }

      // Request is unfulfilled so we are rejecting with an object to return HTTP Status and StatusText
      return Promise.reject({ code: response.status, msg: response.statusText });
    })
    .then(
      (response) => ({ response }),
      (error) => ({ error: { code: error.code, msg: error.msg } })
    );
}

const hasContentType = (response, ...contentTypes) => {
  const contentType = response.headers.get("Content-Type");
  return (
    typeof contentType === "string" && contentTypes.some((value) => contentType.includes(value))
  );
};

/**
 * Checks if response has Content-Type application/json
 * @param {Response} response
 */
const hasContentTypeJSON = (response) => hasContentType(response, "application/json");

const hasContentTypeProblemJSON = (response) =>
  hasContentType(response, "application/problem+json");
