import { LogInOut } from "components/logInOut/logInOut";
import "../styles/globals.css";
import { Tune } from "components/tune/Tune";

import * as layoutStyles from "components/layout.module.scss";

function MyApp({ Component, pageProps }) {
  return (
    <div className={layoutStyles.page}>
      <Component {...pageProps} />

      <footer className={layoutStyles.tuneFooter}>
        <Tune />
      </footer>

      <LogInOut />
    </div>
  );
}

export default MyApp;
