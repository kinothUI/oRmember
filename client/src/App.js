import React from "react";
import { Divider, Container } from "semantic-ui-react";
import moment from "moment-timezone";

import { DefaultNavbar, DefaultMain, DefaultFooter } from "components/layout";
import { extractLanguage } from "helper";

import "./App.css";

const App = () => {
  React.useEffect(() => {
    const language = navigator.language;
    const locale = extractLanguage(language);

    // dynamically import locales
    import(`moment/locale/${locale}`)
      .then(() => moment.locale(locale))
      .catch((e) => moment.locale("en-EN"));
  }, []);

  return (
    <div>
      {/* <Header /> */}
      <DefaultNavbar />
      {/* <div className='pre-main-min-height'>
          <Container as='header'>
            <Divider section />
            <DefaultMain />
          </Container>
        </div> */}

      <div className='main-content'>
        <Container as='section'>
          {/* <Grid> */}
          {/* <Grid.Row> */}
          {/* <AddOrder addOrder={this.addOrder} error={this.state.error} /> */}
          {/* </Grid.Row> */}
          {/* <Grid.Row> */}
          {/* <Grid.Column> */}
          <Divider section />
          {/* {this.renderItemsTable()} */}
          <DefaultMain />

          <Divider section />
          {/* </Grid.Column> */}
          {/* </Grid.Row> */}
          {/* </Grid> */}
        </Container>
      </div>
      <div style={{ position: "fixed", bottom: 0, width: "100%" }}>
        <DefaultFooter />
      </div>
    </div>
  );
};

export default App;
