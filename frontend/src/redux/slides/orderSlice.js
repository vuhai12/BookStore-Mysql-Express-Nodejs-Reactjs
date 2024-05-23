import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiCreateOrder, apiGetOrder } from '../../services/OrderService'


export const fetchCreatNewOrderToolkit = createAsyncThunk(
  'users/fetchCreatNewOrderToolkit',
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiCreateOrder(data)
      return response
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const fetchGetOrderToolkit = createAsyncThunk(
  'users/fetchGetOrderToolkit',
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiGetOrder()
      return response.orderData
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    listOrders: []
  },
  reducers: {
  },

  extraReducers: (builder) => {
    builder.addCase(fetchCreatNewOrderToolkit.fulfilled, (state, action) => {
    })

    builder.addCase(fetchGetOrderToolkit.fulfilled, (state, action) => {
      state.listOrders = action.payload.rows
    })

  },
})

export const {
} = orderSlice.actions

export default orderSlice.reducer