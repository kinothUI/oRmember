import React from "react";
import { useSelector } from "react-redux";
import { Message, Divider } from "semantic-ui-react";

import OrderForm from "components/elements/OrderForm";
import SetupTable from "components/elements/SetupTable";

const DefaultMain = () => {
  const error = useSelector((state) => state.orders.error);
  const hasError = !!error.code;

  return (
    <React.Fragment>
      <OrderForm error={error} />
      <Divider section />
      {hasError ? (
        <Message negative header={`Error ${error.code}`} content={error.msg} />
      ) : (
        <SetupTable />
      )}
    </React.Fragment>
  );
};

export default DefaultMain;
