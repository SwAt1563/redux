import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// import redux toolkit store
import { Provider } from "react-redux";
import { store } from "./store/store";

import { fetchUsers } from "./features/users/usersSlice";
// import { apiSlice } from "./features/api/apiSlice";
// import { ApiProvider } from "@reduxjs/toolkit/query/react";

// fetch users
store.dispatch(fetchUsers());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <ApiProvider api={apiSlice}> */}
      <Provider store={store}>
        <App />
      </Provider>
    {/* </ApiProvider> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
