import React from "react";
import MainRouter from "./MainRouter";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./Store"; // Import both store and persistor
import "./App.css";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MainRouter />
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;

// import React from "react";
// import MainRouter from "./MainRouter";
// import { Provider } from "react-redux";
// import store from "./Store";

// const App = () => {
//   return (
//     <>
//       <Provider store={store}>
//         <MainRouter />
//       </Provider>
//     </>
//   );
// };

// export default App;
