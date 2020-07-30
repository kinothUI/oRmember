import { action } from "redux/actions";

export const ORDERS = "ORDERS";
export const ORDERS_SUCCESS = "ORDERS_SUCCESS";
export const ORDERS_FAILURE = "ORDERS_FAILURE";

export const ORDER_ADD = "ORDER_ADD";
export const ORDER_ADD_SUCCESS = "ORDER_ADD_SUCCESS";
export const ORDER_ADD_FAILURE = "ORDER_ADD_FAILURE";

export const ORDER_PATCH = "ORDER_PATCH";
export const ORDER_PATCH_SUCCESS = "ORDER_PATCH_SUCCESS";
export const ORDER_PATCH_FAILURE = "ORDER_PATCH_FAILURE";

export const ORDER_DELETE = "ORDER_DELETE";
export const ORDER_DELETE_SUCCESS = "ORDER_DELETE_SUCCESS";
export const ORDER_DELETE_FAILURE = "ORDER_DELETE_FAILURE";

export const ORDER_LOGO_DELETE = "ORDER_LOGO_DELETE";
export const ORDER_LOGO_DELETE_SUCCESS = "ORDER_LOGO_DELETE_SUCCESS";
export const ORDER_LOGO_DELETE_FAILURE = "ORDER_LOGO_DELETE_FAILURE";

export const ORDER_LOGO_UPLOAD = "ORDER_LOGO_UPLOAD";
export const ORDER_LOGO_UPLOAD_SUCCESS = "ORDER_LOGO_UPLOAD_SUCCESS";
export const ORDER_LOGO_UPLOAD_FAILURE = "ORDER_LOGO_UPLOAD_FAILURE";

export const successOrders = ({ data }) => action(ORDERS_SUCCESS, { data });

export const failureOrders = (error) => action(ORDERS_FAILURE, { error });

export const successAddOrder = (order, { data }) => action(ORDER_ADD_SUCCESS, { order, data });

export const failureAddOrder = (error) => action(ORDER_ADD_FAILURE, { error });

export const successPatchOrder = (orderId, filled) =>
  action(ORDER_PATCH_SUCCESS, { orderId, filled });

export const failurePatchOrder = (error) => action(ORDER_PATCH_FAILURE, { error });

export const successDeleteOrder = (id) => action(ORDER_DELETE_SUCCESS, { id });

export const failureDeleteOrder = (error) => action(ORDER_DELETE_FAILURE, { error });

export const successDeleteOrderLogo = (orderId, logoId) =>
  action(ORDER_LOGO_DELETE_SUCCESS, { orderId, logoId });

export const failureDeleteOrderLogo = (error) => action(ORDER_LOGO_DELETE_FAILURE, { error });

export const successUploadOrderLogo = ({ files }, orderId) =>
  action(ORDER_LOGO_UPLOAD_SUCCESS, { files, orderId });

export const failureUploadOrderLogo = (error) => action(ORDER_LOGO_UPLOAD_FAILURE, { error });
