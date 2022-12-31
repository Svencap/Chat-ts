/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import i18next from "i18next";
import { io, Socket } from "socket.io-client";
import { I18nextProvider, initReactI18next } from "react-i18next";
import resources from "./locales/index.js";
import App from "./components/App";
import store from "./slices/index.js";
import SocketProvider from "./contexts/socket";
import "bootstrap/dist/css/bootstrap.min.css";

const init = async () => {
  const i18n = i18next.createInstance();
  await i18n.use(initReactI18next).init({
    resources,
    fallbackLng: "ru",
    debug: true,
  });

  const socket: Socket = io();
  const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
  root.render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <SocketProvider socket={socket}>
          <App />
        </SocketProvider>
      </I18nextProvider>
    </Provider>,
  );
};
export default init;
