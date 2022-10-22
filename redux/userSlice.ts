import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
interface UserStateType {
    userList: Array<Object>,
    totalUsersCount: number,
    page: number,
    itemsPerPage: number,
    sortBy: string,
    orderSort: string,
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
    sortBy: 'firstName',
    orderSort: 'asc',
    loading: false
}

export type fetchUsersType = {
    page: number,
    itemsperpage: number,
    sortBy: string,
    orderSort: string
}

export const fetchUsers = createAsyncThunk('users/fetchallusers', async (payload: fetchUsersType) => {
    try {
        const result = (await axios.get(`https://6352389d9d64d7c713112dc9.mockapi.io/users?page=${payload.page}&limit=${payload.itemsperpage}&sortBy=${payload.sortBy}&order=${payload.orderSort}`));
        console.log(result.data);
        return {
            data: result.data.items,
            itemsperpage: payload.itemsperpage,
            page: payload.page,
            total_count: result.data.count,
            sortBy: payload.sortBy,
            orderSort: payload.orderSort
        };
    } catch (err) {
        return err;
    }
});

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
                state.itemsPerPage = payload.itemsperpage;
                state.page = payload.page;
                state.totalUsersCount = payload.total_count;
                state.sortBy = payload.sortBy;
                state.orderSort = payload.orderSort;

            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
            })
    }
})

// Action creators are generated for each case reducer function
export const { toggleLoading } = userSlice.actions
export default userSlice.reducer
