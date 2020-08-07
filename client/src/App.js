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
      .catch(() => moment.locale("en-EN"));
  }, []);

  return (
    <div>
      <DefaultNavbar />

      <div className='main-content'>
        <Container as='main'>
          <Divider section />
          <DefaultMain />

          <Divider section />
        </Container>
      </div>
      <Container as='footer' fluid className='no-padding'>
        <DefaultFooter />
      </Container>
    </div>
  );
};

export default App;
