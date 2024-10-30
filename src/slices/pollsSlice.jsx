import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../utils/apiClient';

export const fetchPolls = createAsyncThunk('polls/fetchPolls', async ({ page, limit }) => {
  const response = await apiClient.get(`/poll/list/${page}?limit=${limit}`);
  return response.data;
});

export const submitVote = createAsyncThunk('polls/submitVote', async ({ pollId, voteOption }) => {
  await apiClient.post(`/poll/vote`, { pollId, voteOption });
  return { pollId, voteOption };
});

const pollsSlice = createSlice({
  name: 'polls',
  initialState: {
    polls: [],
    userVotes: {},
    status: 'idle',
    hasMore: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPolls.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPolls.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.polls = [...state.polls, ...action.payload.polls];
        state.hasMore = action.payload.polls.length > 0;
      })
      .addCase(fetchPolls.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(submitVote.fulfilled, (state, action) => {
        const { pollId, voteOption } = action.payload;
        state.userVotes[pollId] = voteOption;
        localStorage.setItem('userVotes', JSON.stringify(state.userVotes));
      });
  },
});

export default pollsSlice.reducer;
