import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  _id: string;
  username: string;
  password: string;
  name: string;
  role: string;
}

interface AccountState {
  currentUser: User | null;
}

/* 🔹 LOAD FROM localStorage */
const savedUser =
  typeof window !== "undefined"
    ? localStorage.getItem("kambaz_user")
    : null;

const initialState: AccountState = {
  currentUser: savedUser ? JSON.parse(savedUser) : null,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;

      /* 🔹 SAVE TO localStorage */
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "kambaz_user",
          JSON.stringify(action.payload)
        );
      }
    },
  },
});

export const { setCurrentUser } = accountSlice.actions;
export default accountSlice.reducer;
