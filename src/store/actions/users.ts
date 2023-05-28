import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { UserType } from '../../components/auth_register';


export interface usersState {
    users: Array<UserType>;
    user: UserType | null;
}

const initialState: usersState = {
    users: [],
    user: null
}

export const users = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state: usersState, action: PayloadAction<Array<UserType>>) => {
        state.users = action.payload;
      },
    setUser: (state: usersState, action: PayloadAction<UserType | null>) => {
      const newUsers: Array<UserType> = state.users.map(el => {
        if(el.email === action.payload?.email){
          return action.payload 
        }
        return el
      })
      state.users = newUsers
      state.user = action.payload

    }
    }
})


export const { setUsers, setUser } = users.actions;

export default users.reducer