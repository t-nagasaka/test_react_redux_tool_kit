import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = "https://jsonplaceholder.typicode.com/users";

export const fetchAsyncGet = createAsyncThunk(
  // 名称は'Sliceのname/HTTPメソッド'が一般的
  "fetch/get",
  async () => {
    const res = await axios.get(apiUrl);
    // createSliceのextraReducersにactionとしてreturnされる
    return res.data;
  }
);

const fetchSlice = createSlice({
  name: "fetch",
  initialState: { users: [] },
  reducers: {},
  //   createAsyncThunkを使用する場合はextraReducersを記述する必要がある
  // (returnでactionが返ってくるため)
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGet.fulfilled, (state, action) => {
      return {
        ...state,
        users: action.payload,
      };
    });
  },
});

// 別ファイルからuseSelectorでstateの状態を取得するために
// state全体を渡して、name.state名でexportさせる
export const selectUsers = (state) => state.fetch.users;
export default fetchSlice.reducer;
