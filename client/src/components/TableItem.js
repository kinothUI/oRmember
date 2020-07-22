import _ from "lodash";
import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Segment, Button, Header, Icon, Divider } from "semantic-ui-react";
import Dropzone from "react-dropzone";
import ImageGallery from "./ImageGallery";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "semantic-ui-css/semantic.min.css";

class TableItem extends Component {
  convertedTimestamp = (timestamp) => {
    let theDate = new Date(timestamp);
    let day = theDate.getDate();
    let month = theDate.getMonth();
    let year = theDate.getFullYear();
    let hours = theDate.getHours();
    let minutes = theDate.getMinutes();
    return hours + ":" + minutes + " " + day + "." + month + "." + year;
  };

  /**
   *
   * @param {string} uuid the uuid of corresponding row
   * @param {*} logo
   */
  onImageDrop = (uuid, logo) => {
    this.props.uploadLogo(uuid, logo);
  };

  /**
   *
   * @param {string} uuid the uuid of corresponding row
   */
  deleteOrder = (uuid) => {
    this.props.deleteOrder(uuid);
  };

  render() {
    const selected = this.getFilledOrders();
    const selectRow = this.selectRowProps(selected);
    const expandRow = this.renderExpandRow();

    const columns = [
      {
        dataField: "id",
        text: "ID",
        hidden: true,
      },
      {
        dataField: "xchange",
        text: "Exchange",
      },
      {
        dataField: "ticker",
        text: "Symbol",
      },
      {
        dataField: "type",
        text: "Type",
      },
      {
        dataField: "lmt",
        text: "Limit",
      },
      {
        dataField: "volume",
        text: "Volume",
      },
      {
        dataField: "comment",
        text: "Comment",
        hidden: true,
      },
      {
        dataField: "date",
        text: "Datum",
        hidden: true,
      },
    ];

    return (
      <div>
        <BootstrapTable
          keyField='uuid'
          data={this.props.orders}
          columns={columns}
          border={false}
          expandRow={expandRow}
          selectRow={selectRow}
          hover
          striped
          condensed
        />
      </div>
    );
  }

  getFilledOrders() {
    const { orders } = this.props;

    return orders.map((orders) => (orders.filled && orders.uuid) || false);
  }

  /**
   *
   * @param {boolean} selected
   */
  selectRowProps = (selected) => ({
    mode: "checkbox",
    clickToSelect: false,
    clickToExpand: true,
    hideSelectAll: true,
    onSelect: (row) => {
      this.props.toggleFilled(row.uuid);
    },
    selected,
    style: { textDecoration: "line-through", backgroundColor: "#c8e6c9" },
  });

  renderExpandRow = () => ({
    showExpandColumn: false,
    renderer: (row) => {
      const { deleteLogo } = this.props;

      return (
        <div>
          <table className='expandRowTable'>
            <tbody>
              <tr>
                <td rowSpan='2'>
                  <div>
                    <Segment>
                      <Header as='h4' textAlign='center'>
                        Comment{" "}
                        <Icon
                          name='comment alternate outline'
                          color={_.isEmpty(row.comment) ? "red" : "black"}
                        />
                      </Header>
                      <Divider />
                      {row.comment}
                      {_.isEmpty(row.comment) ? null : <Divider />}
                      <p className='date'>
                        Setup set @{" "}
                        {new Intl.DateTimeFormat("de-DE", {
                          year: "numeric",
                          month: "long",
                          weekday: "long",
                          day: "numeric",
                          hour: "numeric",
                          hour12: false,
                          minute: "numeric",
                        }).format(row.date)}
                      </p>
                    </Segment>
                  </div>
                </td>
                <td>
                  {row.logo && row.logo.length > 0 ? (
                    <ImageGallery images={row.logo} deleteLogo={deleteLogo} />
                  ) : (
                    <Dropzone
                      onDrop={this.onImageDrop.bind(this, row.uuid)}
                      accept='image/jpg,image/jpeg,image/png'
                      multiple={true}
                    >
                      {({ getRootProps, getInputProps }) => {
                        return (
                          <div {...getRootProps()}>
                            <input {...getInputProps()} />
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
                    onClick={this.deleteOrder.bind(this, row.uuid)}
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
  });
}

export default TableItem;
