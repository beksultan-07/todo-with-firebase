import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface authType {
    auth: boolean;
    email: string;
  }

export interface authState {
    auth: boolean;
    email: string
}

const initialState: authState = {
    auth: false,
    email: ''
}

export const auth = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    setAuth: (state: authState, action: PayloadAction<authType>) => {
        state.auth = action.payload.auth;
        state.email = action.payload.email;
      },
    }
})


export const { setAuth } = auth.actions;

export default auth.reducer