import React, { Component } from "react";
import uuid from "uuid";
import TableItem from "./components/TableItem";
import AddOrder from "./components/AddOrder";
import Header from "./components/layout/Header";
import request from "superagent";

import { Divider } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

class App extends Component {
  state = {
    orders: []
  };

  componentDidMount() {
    this.getOrders();
  }

  getOrders = () => {
    fetch("/api/orderData/orders")
      .then(response => response.json())
      .then(data => this.getLogos(data.data))
      .catch(error => console.error(error));
  };

  getLogos = orders => {
    fetch("/api/logoData/logos")
      .then(response => response.json())
      .then(data => this.handleInitialData(orders, data.data))
      .catch(error => console.error(error));
  };

  handleInitialData = (order, logo) => {
    if (order) {
      this.setState({
        orders: order.map(i => {
          logo.map(j => {
            if (i.uuid === j.uuid) {
              if (i.logo) {
                let arr = [...i.logo];
                arr.push(j);
                i.logo = arr;
              } else {
                let arr = [];
                arr.push(j);
                i.logo = arr;
              }
            }
            return j;
          });
          return i;
        })
      });
    }
  };

  rememberOrder = (xchange, ticker, type, lmt, volume, comment, date) => {
    const newOrder = {
      uuid: uuid.v4(),
      xchange,
      ticker,
      type,
      lmt,
      volume,
      comment,
      date,
      filled: false,
      logo: false
    };
    this.setState({ orders: [...this.state.orders, newOrder] });
    fetch(
      `/api/orderData/orders/add?uuid=${
        newOrder.uuid
      }&xchange=${xchange}&ticker=${ticker}&type=${type}&lmt=${lmt}&volume=${volume}&comment=${comment}&date=${date}`
    );
  };

  toggleFilled = id => {
    this.setState({
      orders: this.state.orders.map(order => {
        if (order.uuid === id) {
          order.filled = !order.filled;
          fetch(
            `/api/orderData/orders/filled?uuid=${id}&filled=${order.filled}`
          ).catch(err => console.error(err));
        }
        return order;
      })
    });
  };

  deleteOrder = uuid => {
    const { orders } = this.state;
    this.setState({
      orders: [...this.state.orders.filter(orders => orders.uuid !== uuid)]
    });
    fetch(`/api/orderData/orders/delete/${uuid}`).catch(response =>
      console.error(response)
    );
    orders.map(order => {
      if (order.uuid === uuid) {
        let a = order.logo;
        if (a && a.length) {
          a.map(logo => {
            this.deleteLogo(logo.src);
            return logo;
          });
        }
      }
      return order;
    });
  };

  deleteLogo = (filename, uuid) => {
    if (uuid) {
      const { orders } = this.state;
      this.setState({
        orders: orders.map(order => {
          if (order.uuid === uuid) {
            let logoArr = [...order.logo];
            logoArr.filter(logo => logo.src !== filename);
            order.logo = logoArr;
          }
          return order;
        })
      });
      orders.map(order => {
        if (order.uuid === uuid) {
          let newLogo = order.logo.filter(logo => logo.src !== filename);
          order.logo = newLogo;
        }
        return order;
      });
      fetch("/api/logoData/logos/delete/" + filename).catch(err =>
        console.error(err)
      );
    } else {
      fetch("/api/logoData/logos/delete/" + filename).catch(err =>
        console.error(err)
      );
    }
  };

  uploadLogo = (uuid, logo) => {
    logo.map(logo => {
      let upload = request
        .post("/api/logoData/logo/upload")
        .field("file", logo)
        .field("uuid", uuid);
      upload.end((err, response) => {
        if (err) {
          console.error(err);
        } else {
          this.handleLogoUploadResponse(
            response.body.uuid,
            response.body.filename
          );
        }
      });
      return logo;
    });
  };

  handleLogoUploadResponse = (uuid, filename) => {
    const { orders } = this.state;
    let logo = {
      uuid,
      src: `${filename}`,
      thumbnail: `${filename}`,
      thumbnailWidth: 150,
      thumbnailHeight: 85
    };

    this.setState({
      orders: orders.map(order => {
        if (order.uuid === uuid) {
          if (order.logo) {
            let arr = [...order.logo];
            arr.push(logo);
            order.logo = arr;
          } else {
            let arr = [];
            arr.push(logo);
            order.logo = arr;
          }
        }
        return order;
      })
    });
  };

  render() {
    return (
      <div>
        <Header />
        <br />

        <div className={"container"}>
          <div className={"row"}>
            <div className={"col-lg-12"}>
              <Divider />

              <AddOrder rememberOrder={this.rememberOrder} />

              <Divider />
            </div>
          </div>
          <div className={"row"}>
            <div className={"col-lg-12"}>
              <TableItem
                orders={this.state.orders}
                toggleFilled={this.toggleFilled}
                deleteOrder={this.deleteOrder}
                uploadLogo={this.uploadLogo}
                deleteLogo={this.deleteLogo}
                logo={this.state.logo}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
