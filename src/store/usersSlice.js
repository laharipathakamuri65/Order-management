import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const res = await fetch('https://dummyjson.com/users');
  const data = await res.json();
  return data.users || [];
});

// Async thunk to update a user via API and return updated user
export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ userId, updatedData }, thunkAPI) => {
    try {
      const res = await fetch(`https://dummyjson.com/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) {
        return thunkAPI.rejectWithValue(`Failed to update user: ${res.status}`);
      }
      const data = await res.json();
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || 'Update failed');
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: { items: [], loading: false, error: null },
  reducers: {
    // userUpdated(state, action) {
    //   const updated = action.payload;
    //   state.items = state.items.map(u => (u.id === updated.id ? updated : u));
    // },
    setUsers(state, action) {
      state.items = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Failed to load users';
      });
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        state.items = state.items.map(u => (u.id === updated.id ? updated : u));
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message || 'Failed to update user';
      });
  }
});

export const { userUpdated, setUsers } = usersSlice.actions;
export default usersSlice.reducer;
