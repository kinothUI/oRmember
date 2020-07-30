import React from "react";
import { useDispatch } from "react-redux";
import { Form, Input, Button } from "semantic-ui-react";

import { ORDER_ADD } from "redux/actions/order";
import { action } from "redux/actions";

const InitialState = {
  broker: "",
  ticker: "",
  limit: "",
  volume: "",
  date: new Date(),
  note: "",
  disabled: false,
};

const OrderForm = (props) => {
  const hasError = !!props.error.code;

  const [order, setOrder] = React.useState(InitialState);
  const dispatch = useDispatch();

  const handleOnChange = (event) => setOrder({ ...order, [event.target.name]: event.target.value });

  const handleOnSubmit = (event) => {
    order.date = new Date();
    dispatch(action(ORDER_ADD, { order }));

    event.target.reset();
  };

  return (
    <React.Fragment>
      <Form onSubmit={handleOnSubmit} className='form-position' autoComplete='off'>
        <Input
          type='text'
          name='broker'
          placeholder='Broker or Exchange'
          onChange={handleOnChange}
          required
          disabled={hasError}
        />
        <Input
          type='text'
          name='ticker'
          placeholder='Ticker or Symbol'
          onChange={handleOnChange}
          required
          disabled={hasError}
        />
        <ul className={hasError ? "buy disabled" : "buy"}>
          <li>
            <input
              type='radio'
              checked={order.direction === "long"}
              onChange={handleOnChange}
              name='direction'
              id='buy'
              value='long'
              required
              disabled={hasError}
            />
            <label htmlFor='buy'>Buy</label>
          </li>
        </ul>
        <ul className={hasError ? "sell disabled" : "sell"}>
          <li>
            <input
              type='radio'
              checked={order.direction === "short"}
              onChange={handleOnChange}
              name='direction'
              id='sell'
              value='short'
              required
              disabled={hasError}
            />
            <label htmlFor='sell'>Sell</label>
          </li>
        </ul>
        <Input
          type='text'
          name='price'
          onChange={handleOnChange}
          placeholder='Limit Price'
          required
          disabled={hasError}
        />
        <Input
          type='text'
          name='volume'
          onChange={handleOnChange}
          placeholder='Volume'
          required
          disabled={hasError}
        />
        <Input
          type='text'
          name='note'
          onChange={handleOnChange}
          placeholder='Note'
          disabled={hasError}
        />
        <Button
          type='submit'
          content='Save Setup'
          disabled={order.disabled || hasError}
          color='olive'
        />
      </Form>
    </React.Fragment>
  );
};

export default OrderForm;
