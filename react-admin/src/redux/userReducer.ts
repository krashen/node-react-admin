import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type UserType = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
}

export interface UserInitialState {
    user: UserType
}

const initialState: UserInitialState = {
    user : {
        id : -1,
        first_name: '',
        last_name: '',
        email: ''
    }  
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action: PayloadAction<UserType>) => {
            state.user = action.payload
        }
    }
})

export const  { updateUser } = userSlice.actions
export default userSlice.reducer