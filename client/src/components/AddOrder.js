import React, { Component } from "react";
import { Form, Input, Button } from "semantic-ui-react";

export class AddOrder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      xchange: "",
      ticker: "",
      type: "",
      lmt: "",
      volume: "",
      date: "",
      comment: "",
      disabled: false
    };
  }

  onSubmit = e => {
    const { xchange, ticker, type, lmt, volume, comment } = this.state;
    e.preventDefault();
    let date = Date.now();
    this.props.rememberOrder(xchange, ticker, type, lmt, volume, comment, date);
    this.setState({
      xchange: "",
      ticker: "",
      type: "",
      lmt: "",
      volume: "",
      comment: ""
    });
    e.target.reset();
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <>
        <Form
          onSubmit={this.onSubmit}
          style={{ display: "flex" }}
          autoComplete='off'
        >
          <Input
            type='text'
            name='xchange'
            onChange={this.onChange}
            placeholder='Add Exchange...'
            required
          />
          <Input
            type='text'
            name='ticker'
            onChange={this.onChange}
            placeholder='Add Ticker...'
            required
          />
          <ul className='buy'>
            <li>
              <input
                type='radio'
                checked={this.state.type === "buy"}
                onChange={this.onChange}
                name='type'
                id='buy'
                value='buy'
                required
              />
              <label htmlFor='buy'>Buy</label>
            </li>
          </ul>
          <ul className='sell'>
            <li>
              <input
                type='radio'
                checked={this.state.type === "sell"}
                onChange={this.onChange}
                name='type'
                id='sell'
                value='sell'
                required
              />
              <label htmlFor='sell'>Sell</label>
            </li>
          </ul>
          <Input
            type='text'
            name='lmt'
            onChange={this.onChange}
            placeholder='your Limit...'
            required
          />
          <Input
            type='text'
            name='volume'
            onChange={this.onChange}
            placeholder='Volume...'
            required
          />
          <Input
            type='text'
            name='comment'
            onChange={this.onChange}
            placeholder='Comment...'
          />
          <Button
            type='submit'
            name='Submit'
            variant='outline-dark'
            disabled={this.state.disabled}
          >
            Add Order
          </Button>
        </Form>
      </>
    );
  }
}

export default AddOrder;
