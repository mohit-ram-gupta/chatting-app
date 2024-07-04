import { combineReducers } from "@reduxjs/toolkit";
import UiReducer from "./UiReducer"; // Import your UiReducer or any other reducers you have

const rootReducer = combineReducers({
  ui: UiReducer.reducer,
  // Add other reducers here if you have more
});

export default rootReducer;

// import UiReducer from "./UiReducer";

// const rootReducer = {
//   ui: UiReducer.reducer,
// };

// export default rootReducer;
