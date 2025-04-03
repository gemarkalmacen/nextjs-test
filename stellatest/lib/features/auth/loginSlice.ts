import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FormValues = {
    username: string;
    password: string;
  };
  
  const initialState: FormValues = {
    username: "",
    password: "",
  };
  
  const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
      loginUsername: (state, action: PayloadAction<string>) => {
        state.username = action.payload;
      },
      loginPass: (state, action: PayloadAction<string>) => {
        state.password = action.payload;
      },
  
      // loginField: (state, action: PayloadAction<{ field: keyof FormDataLogin; value: any }>) => {
      //   state[action.payload.field] = action.payload.value;
      // },
      // resetForm: () => initialState,
    },
  });
  
  export const { loginUsername, loginPass } = loginSlice.actions;
  export default loginSlice.reducer;
  