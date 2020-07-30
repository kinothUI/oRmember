import { takeLatest, call, put } from "redux-saga/effects";

import {
  ORDERS,
  ORDER_ADD,
  ORDER_PATCH,
  ORDER_DELETE,
  ORDER_LOGO_UPLOAD,
  ORDER_LOGO_DELETE,
  successOrders,
  failureOrders,
  successAddOrder,
  failureAddOrder,
  successDeleteOrder,
  failureDeleteOrder,
  successUploadOrderLogo,
  failureUploadOrderLogo,
  failureDeleteOrderLogo,
  successDeleteOrderLogo,
  failurePatchOrder,
  successPatchOrder,
} from "redux/actions/order";
import {
  fetchOrders,
  fetchAddOrder,
  fetchPatchOrder,
  fetchDeleteOrder,
  uploadFiles,
  fetchDeleteOrderLogo,
} from "services/order";

/******************************************************************************/
/******************************** Saga Workers ********************************/
/******************************************************************************/

/**
 * Generates a Saga that mangages the process for fetching all orders
 */
function* ordersWorker() {
  const { response, error } = yield call(fetchOrders);

  if (error) yield put(failureOrders(error));
  else yield put(successOrders(response));
}

/**
 * Generates a Saga that manages the adding process
 */
function* addOrderWorker(action) {
  const { response, error } = yield call(fetchAddOrder, action.order);

  if (error) yield put(failureAddOrder(error));
  else yield put(successAddOrder(action.order, response));
}

/**
 * Generates a Saga that manages the patching process
 */
function* patchOrderWorker(action) {
  const { orderId, filled } = action;

  const { error } = yield call(fetchPatchOrder, orderId, filled);

  if (error) yield put(failurePatchOrder(error));
  else yield put(successPatchOrder(orderId, filled));
}

/**
 * Generates a Saga that manages the order-delete process
 */
function* deleteOrderWorker(action) {
  const { error } = yield call(fetchDeleteOrder, action.id, action.files);

  if (error) yield put(failureDeleteOrder(error));
  else yield put(successDeleteOrder(action.id));
}

/**
 * Generates a Saga that manages the upload process on images
 */
function* uploadOrderLogoWorker(action) {
  const { response, error } = yield call(
    uploadFiles,
    action.files,
    action.orderId,
    action.orderUuid
  );

  if (error) yield put(failureUploadOrderLogo(error));
  else yield put(successUploadOrderLogo(response, action.orderId));
}

/**
 * Generates a Saga that manages the logo-delete process
 */
function* deleteOrderLogoWorker(action) {
  const { error } = yield call(fetchDeleteOrderLogo, action.logoId, action.filename);

  if (error) yield put(failureDeleteOrderLogo(error));
  else yield put(successDeleteOrderLogo(action.orderId, action.logoId));
}

/******************************************************************************/
/******************************** Saga Watchers *******************************/
/******************************************************************************/

/**
 * Fetch All Orders Watcher
 */
export function* ordersWatcher() {
  yield takeLatest(ORDERS, ordersWorker);
}

/**
 * Add Order Watcher
 */
export function* addOrderWatcher() {
  yield takeLatest(ORDER_ADD, addOrderWorker);
}

/**
 * Patch Order Watcher
 */
export function* patchOrderWatcher() {
  yield takeLatest(ORDER_PATCH, patchOrderWorker);
}

/**
 * Delete Order Watcher
 */
export function* deleteOrderWatcher() {
  yield takeLatest(ORDER_DELETE, deleteOrderWorker);
}

/**
 * Upload Order-Logo Watcher
 */
export function* uploadOrderLogoWatcher() {
  yield takeLatest(ORDER_LOGO_UPLOAD, uploadOrderLogoWorker);
}

/**
 * Delete Order-Logo Watcher
 */
export function* deleteOrderLogoWatcher() {
  yield takeLatest(ORDER_LOGO_DELETE, deleteOrderLogoWorker);
}
