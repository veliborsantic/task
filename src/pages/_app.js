import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import store from "../store";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";

function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}

export default App;
