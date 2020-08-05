import callApi, { HttpMethod } from "services/api";
import FormData from "form-data";

export const fetchOrders = () => callApi("/api/order/");

export const fetchAddOrder = (body) => callApi("/api/order/add", HttpMethod.POST, body);

export const fetchPatchOrder = (orderId, filled) =>
  callApi("/api/order/patch", HttpMethod.PATCH, { orderId, filled });

export const fetchDeleteOrder = (id, files) =>
  callApi("/api/order/delete/", HttpMethod.DELETE, { id, files });

export const fetchDeleteOrderLogo = (id, filename) =>
  callApi("/api/logo/delete", HttpMethod.DELETE, { id, filename });

/**
 *
 * @param {File[]} files
 * @param {String} orderId
 * @param {String} orderUuid
 */
export const uploadFiles = (files, orderId, orderUuid) => {
  const formData = new FormData();

  files.forEach((file) => formData.append("files", file));

  return callApi(
    `/api/logo/upload/orderId/${orderId}/orderUuid/${orderUuid}`,
    HttpMethod.POST,
    formData
  );
};
