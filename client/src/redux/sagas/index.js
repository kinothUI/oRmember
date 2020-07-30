import { all } from "redux-saga/effects";

import {
  ordersWatcher,
  addOrderWatcher,
  patchOrderWatcher,
  deleteOrderWatcher,
  uploadOrderLogoWatcher,
  deleteOrderLogoWatcher,
} from "./order";

export default function* rootSaga() {
  yield all([
    ordersWatcher(),
    addOrderWatcher(),
    patchOrderWatcher(),
    deleteOrderWatcher(),
    uploadOrderLogoWatcher(),
    deleteOrderLogoWatcher(),
  ]);
}
