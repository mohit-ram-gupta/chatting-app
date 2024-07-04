const { createSlice } = require("@reduxjs/toolkit");
const UiReducer = createSlice({
  name: "ui",
  initialState: {
    id: null,
    receiverId: null,
    grp_receiverId: null,
    grp_message: null,
    user: null,
    allUser: null,
    grp_id: null,
    sel_messId: null,
    sel_mess: null,
    drag_img: null,
    username: null,
    media: false,
    status: null,
    editId: [],
    selectemem: []
  },
  reducers: {
    setId(state, action) {
      state.id = action.payload;
    },
    setReceiverId(state, action) {
      state.receiverId = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setallUser(state, action) {
      state.allUser = action.payload;
    },
    seteditId(state, action) {
      state.editId = action.payload;
    },
    setgrp_receiverId(state, action) {
      state.grp_receiverId = action.payload;
    },
    setgrp_message(state, action) {
      state.grp_message = action.payload;
    },
    setgrp_id(state, action) {
      state.grp_id = action.payload;
    },
    setSel_MessId(state, action) {
      state.sel_messId = action.payload;
    }, 
    setDragImg(state, action) {
      state.drag_img = action.payload;
    }, 
    setMedia(state, action) {
      state.media = action.payload;
    }, 
    setuserName(state, action) {
      state.username = action.payload;
    }, 
    setStatus(state, action) {
      state.status = action.payload;
    }, 
    // setSel_Mess(state, action) {
    //   state.sel_mess = action.payload;
    // },
    setSel_Mess(state, action) {
      state.sel_mess = action.payload === null ? '' : action.payload;
    },
    setselecteMem(state, action) {
      state.selectemem = [...state.selectemem, action.payload];
    },
    // toggleSelecteMem(state, action) {
    //   const userId = action.payload;
    //   if (state.selectemem.includes(userId)) {
    //     state.selectemem = state.selectemem.filter(id => id !== userId);
    //   } else {
    //     state.selectemem.push(userId);
    //   }
    // },
  },
});

const { actions } = UiReducer;
export const { setId, setReceiverId, setUser, setallUser, seteditId, setselecteMem, toggleSelecteMem,setgrp_receiverId, setgrp_message,setgrp_id, setSel_MessId,setSel_Mess,setDragImg,setMedia, setuserName,setStatus} = actions;

export default UiReducer;
