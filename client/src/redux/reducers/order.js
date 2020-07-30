import _ from "lodash";

import {
  ORDERS,
  ORDERS_SUCCESS,
  ORDERS_FAILURE,
  ORDER_ADD,
  ORDER_ADD_SUCCESS,
  ORDER_ADD_FAILURE,
  ORDER_PATCH,
  ORDER_PATCH_SUCCESS,
  ORDER_PATCH_FAILURE,
  ORDER_LOGO_UPLOAD,
  ORDER_LOGO_UPLOAD_SUCCESS,
  ORDER_LOGO_UPLOAD_FAILURE,
  ORDER_DELETE,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAILURE,
  ORDER_LOGO_DELETE,
  ORDER_LOGO_DELETE_SUCCESS,
  ORDER_LOGO_DELETE_FAILURE,
} from "redux/actions/order";

const InitialState = {
  content: [],
  error: { code: 0, msg: "" },
  isLoading: false,
};

export default function orderReducer(state = InitialState, action) {
  switch (action.type) {
    case ORDERS:
      return _.assign({}, newState(state, {}, {}, true));

    case ORDERS_SUCCESS:
      return _.assign({}, newState(state, action.data, {}, false));

    case ORDERS_FAILURE:
      return _.assign({}, newState(state, {}, action.error, false));

    case ORDER_ADD:
      return _.assign({}, newState(state, {}, {}, true));

    case ORDER_ADD_SUCCESS:
      const newContent = state.content.concat({
        ...action.data,
        ...action.order,
        logo: null,
        filled: 0,
      });

      return _.assign({}, newState(state, newContent, {}, false));

    case ORDER_ADD_FAILURE:
      return _.assign({}, newState(state, {}, action.error, false));

    case ORDER_PATCH:
      return _.assign({}, newState(state, {}, {}, true));

    case ORDER_PATCH_SUCCESS:
      const indOfOrder = state.content.findIndex((order) => order.id === action.orderId);

      state.content[indOfOrder].filled = action.filled;

      return _.assign({}, newState(state, state.content, {}, false));

    case ORDER_PATCH_FAILURE:
      return _.assign({}, newState(state, {}, action.error, false));

    case ORDER_LOGO_UPLOAD:
      return _.assign({}, newState(state, {}, {}, true));

    case ORDER_LOGO_UPLOAD_SUCCESS:
      const iOfOrder = state.content.findIndex((order) => order.id === action.orderId);

      state.content[iOfOrder].logo = action.files;

      return _.assign({}, newState(state, state.content, {}, false));

    case ORDER_LOGO_UPLOAD_FAILURE:
      return _.assign({}, newState(state, {}, action.error, false));

    case ORDER_DELETE:
      return _.assign({}, newState(state, {}, {}, true));

    case ORDER_DELETE_SUCCESS:
      const filteredOrders = state.content.filter((order) => order.id !== action.id);

      return _.assign({}, newState(state, filteredOrders, {}, false));

    case ORDER_DELETE_FAILURE:
      return _.assign({}, newState(state, {}, action.error, false));

    case ORDER_LOGO_DELETE:
      return _.assign({}, newState(state, {}, {}, true));

    case ORDER_LOGO_DELETE_SUCCESS:
      const indexOfOrder = state.content.findIndex((order) => order.id === action.orderId);
      const order = state.content[indexOfOrder];
      const filteredLogos = order.logo.filter((logo) => logo.id !== action.logoId);

      order.logo = filteredLogos.length > 0 ? filteredLogos : null;
      state.content.splice(indexOfOrder, 1, order);

      return _.assign({}, newState(state, state.content, {}, false));

    case ORDER_LOGO_DELETE_FAILURE:
      return _.assign({}, state, {}, action.error, false);

    default:
      return state;
  }
}

/**
 * Produces the right shape of a new state object
 * @param {*} state current state
 * @param {*} content the new content produced
 * @param {*} error error on failure actions
 * @param {Boolean} isLoading
 */
const newState = (state, content, error, isLoading) => {
  const emptyContent = _.isEmpty(content);
  const contentIsArray = _.isArray(content);
  const emptyError = _.isEmpty(error);

  if (emptyContent && emptyError && !contentIsArray) return { ...state, isLoading };
  else if (emptyContent && contentIsArray) return { ...state, content, isLoading };
  else if (emptyContent) return { ...state, error, isLoading };
  else if (emptyError) return { ...state, content, isLoading };

  return { ...state, content, error, isLoading };
};
