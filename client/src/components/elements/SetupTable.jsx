//ToDo: Setup-Datum

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import BootStrapTable from "react-bootstrap-table-next";
import Dropzone from "react-dropzone";
import { Segment, Header, Icon, Divider, Button } from "semantic-ui-react";
import moment from "moment-timezone";

import ImageGallery from "components/elements/ImageGallery";
import { action } from "redux/actions";
import {
  ORDER_PATCH,
  ORDER_DELETE,
  ORDER_LOGO_UPLOAD,
  ORDER_LOGO_DELETE,
  ORDERS,
} from "redux/actions/order";

const SetupTable = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(action(ORDERS, {}));
  }, [dispatch]);

  const orders = useSelector((store) => store.orders);

  const handleLogoUpload = (files, orderId, orderUuid) =>
    dispatch(action(ORDER_LOGO_UPLOAD, { files, orderId, orderUuid }));

  const handleLogoDelete = (orderId, logoId, filename) =>
    dispatch(action(ORDER_LOGO_DELETE, { orderId, logoId, filename }));

  const formatDirection = (cell, row, rowIndex, formatExtraData) =>
    cell === "long" ? (
      <React.Fragment>
        <Icon className='icon-arrow-up' color='green' /> Long
      </React.Fragment>
    ) : (
      <React.Fragment>
        <Icon className='icon-arrow-down' color='red' /> Short
      </React.Fragment>
    );

  const selected = orders.content.map((order) => (order.filled && order.id) || false);
  const selectRow = {
    mode: "checkbox",
    clickToSelect: false,
    clickToExpand: true,
    hideSelectAll: true,
    onSelect: (row) => dispatch(action(ORDER_PATCH, { orderId: row.id, filled: !row.filled })),
    selected,
    style: { backgroundColor: "#c8e6c9" },
  };
  const expandRow = {
    showExpandColumn: false,
    renderer: (row) => {
      const hasNote = !!row.note;
      const hasLogo = !!row.logo;

      const date = moment(row.date).format("L LT");

      return (
        <div>
          <table className='expandRowTable'>
            <tbody>
              <tr>
                <td rowSpan='2'>
                  <div>
                    <Segment>
                      <Header as='h4' textAlign='center'>
                        Note <Icon name='comment alternate outline' />
                      </Header>
                      <Divider />
                      {row.note}
                      {hasNote && <Divider />}
                      <p className='date'>{date}</p>
                    </Segment>
                  </div>
                </td>
                <td>
                  {hasLogo ? (
                    <ImageGallery
                      logo={row.logo}
                      deleteLogo={(logoId, filename) => handleLogoDelete(row.id, logoId, filename)}
                    />
                  ) : (
                    <Dropzone
                      onDrop={(files) => handleLogoUpload(files, row.id, row.uuid)}
                      accept='image/jpg,image/jpeg,image/png'
                      multiple={true}
                    >
                      {(props) => {
                        return (
                          <div {...props.getRootProps()}>
                            <input {...props.getInputProps()} />
                            {<p className='fileDrop'>Try dropping one or more files here</p>}
                          </div>
                        );
                      }}
                    </Dropzone>
                  )}
                </td>
              </tr>
              <tr>
                <td align='right' style={{ verticalAlign: "bottom" }}>
                  <Button
                    onClick={() => dispatch({ type: ORDER_DELETE, id: row.id, files: row.logo })}
                    size='small'
                    icon='trash alternate outline'
                    color='red'
                    circular
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    },
  };

  const columns = [
    {
      dataField: "id",
      text: "ID",
      hidden: true,
    },
    {
      dataField: "direction",
      text: "Trade Direction",
      formatter: formatDirection,
      formatExtraData: {
        short: "short",
        long: "long",
      },
    },
    {
      dataField: "broker",
      text: "Broker",
    },
    {
      dataField: "ticker",
      text: "Ticker",
    },
    {
      dataField: "price",
      text: "Limit-Price",
    },
    {
      dataField: "volume",
      text: "Volume",
    },
    {
      dataField: "note",
      text: "Note",
      hidden: true,
    },
    {
      dataField: "date",
      text: "Datum",
      hidden: true,
    },
  ];

  return (
    <BootStrapTable
      keyField='id'
      data={orders.content}
      columns={columns}
      expandRow={expandRow}
      selectRow={selectRow}
      striped
      condensed
    />
  );
};

export default SetupTable;
