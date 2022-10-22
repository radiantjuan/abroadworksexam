import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
interface UserStateType {
    userList: Array<Object>,
    totalUsersCount: number,
    page: number,
    itemsPerPage: number,
    loading: boolean
}

interface ActionDataType {
    payload: string;
}

const initialState: UserStateType = {
    userList: [],
    totalUsersCount: 0,
    page: 1,
    itemsPerPage: 10,
    loading: false
}

export type fetchUsersType = {
    page: number,
    limit: number
}

export const fetchUsers = createAsyncThunk('users/fetchallusers', async (payload: fetchUsersType) => {
    try {
        const result = (await axios.get(`https://6352389d9d64d7c713112dc9.mockapi.io/users?page=${payload.page}&limit=${payload.limit}`));
        return { data: result.data, itemsperpage: payload.limit };
    } catch (err) {
        return err;
    }
});

export const fetchUserTotalCount = createAsyncThunk('users/fetchUserTotalCount', async () => {
    try {
        const result = (await axios.get(`https://6352389d9d64d7c713112dc9.mockapi.io/users`));
        return result.data.length;
    } catch (err) {
        return err;
    }
})

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        toggleLoading: (state) => {
            state.loading = true;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchUsers.fulfilled, (state, { payload }: any) => {
                state.loading = false;
                state.userList = payload.data;
                state.itemsPerPage = payload.itemsperpage
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
            }).addCase(fetchUserTotalCount.fulfilled, (state, { payload }: any) => {
                state.totalUsersCount = payload;
            });
    }
})

// Action creators are generated for each case reducer function
export const { toggleLoading } = userSlice.actions
export default userSlice.reducer
