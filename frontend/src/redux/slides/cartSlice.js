import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchGetCartToolkit = createAsyncThunk(
  'users/fetchGetCartToolkit',
  async (data, thunkAPI) => {
    try {
      const response = await apiGetCart()
      return { res: response.cartData }
    } catch (error) {
      if (error.response) {
        return error.response
      }
      else return { success: false, message: error.message }
    }
  }
)

export const fetchAddCartToolkit = createAsyncThunk(
  'users/fetchAddCartToolkit',
  async (data, thunkAPI) => {
    try {
      const response = await apiAddCart(data)
      return response
    } catch (error) {
      console.log(error)
    }
  }
)
export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: [],
    totalPrice: 0,
    cartToTalBook: 0,
    bookIds: [],
    isCheckedAll: false,
    cartsChecked: []
  },
  reducers: {

    getCartsChecked: (state, action) => {
      state.cartsChecked = state.carts.filter((item) => item.isChecked == true)
    },

    removeItemCheckedCarts: (state, action) => {
      const itemIndex = state.carts.findIndex((item) => item.bookId == action.payload)
      console.log('tess',state.carts[itemIndex])
      if (state.carts[itemIndex].isChecked == true) {
        state.carts = state.carts.filter((item) => item != state.carts[itemIndex])
      }
    },

    removeAllItemCheckedCarts: (state, action) => {
      state.isCheckedAll=false
      state.carts = state.carts.filter((item) => item.isChecked != true)
    },

    removeItemCarts: (state, action) => {
      state.carts = state.carts.filter((item) => item.isChecked != true)
    },

    checkedItem: (state, action) => {
      const itemIndex = state.carts.findIndex((item) => item.bookId == action.payload.bookId)
      const isChecked = state.bookIds.includes(action.payload.bookId)

      if (isChecked) {
        state.carts[itemIndex].isChecked = false
        state.bookIds = state.bookIds.filter((item) => item != action.payload.bookId)
      } else {
        state.carts[itemIndex].isChecked = true
        state.bookIds.push(action.payload.bookId)
      }
    },

    checkedAllItem: (state, action) => {
      
      
      if (action.payload.isCheckedAll) {
        state.isCheckedAll = action.payload.isCheckedAll
        state.carts.map((item) => item.isChecked = true)
        state.bookIds = action.payload.arrAllIdBook
        
      } else {
        state.isCheckedAll = action.payload.isCheckedAll
        state.carts.map((item) => item.isChecked = false)
        state.bookIds = []
      }
    },

    addToCart: (state, action) => {
     
      const itemIndex = state.carts.findIndex((item) => item?.bookId == action.payload.bookId)
      
      if (itemIndex !== -1) {
        state.carts[itemIndex] = {
          bookId: action.payload.bookId,
          quantity: action.payload.quantity,
          price: action.payload.price,
          isChecked: false,
          image: (action.payload.image)
        }
      } else {
        const temBook = {
          bookId: action.payload.bookId,
          quantity: action.payload.quantity,
          price: action.payload.price,
          isChecked: false,
          image: (action.payload.image)
        }
        state.carts.push(temBook)
      }
    },

    decrementItem: (state, action) => {
      const itemIndex = state.carts.findIndex((item) => item.bookId == action.payload.bookId)
      state.carts[itemIndex].quantity = action.payload.quantity - 1
    },

    incrementItem: (state, action) => {
      const itemIndex = state.carts.findIndex((item) => item.bookId == action.payload.bookId)
      state.carts[itemIndex].quantity = action.payload.quantity + 1
    },

    getTotalPrice: (state) => {
      const totalPrice = state.carts.reduce((total, book) => {
        if (book.isChecked == true) {
          return total + (+book.price * +book.quantity);
        } else {
          return total
        }
      }, 0);
      const cartToTalBook = state.carts.reduce((total, book) => {
        if (book.isChecked == true) {
          return total + (+book.quantity);
        } else {
          return total
        }
      }, 0);
      state.totalPrice = totalPrice;
      state.cartToTalBook = cartToTalBook;
    },
  },

  extraReducers: (builder) => {

    builder.addCase(fetchAddCartToolkit.pending, (state, action) => {
      // Add user to the state array
      return ({
        ...state,
        statusLoading: true,
      })
    })

    //add create new book
    builder.addCase(fetchAddCartToolkit.fulfilled, (state, action) => {
      // Add user to the state array
      return ({
        ...state,
        statusLoading: false,
      })
    })

    builder.addCase(fetchGetCartToolkit.pending, (state, action) => {
      return ({
        ...state,
      })
    })

    builder.addCase(fetchGetCartToolkit.fulfilled, (state, action) => {
      return ({
        ...state,
        listCart: action.payload.res
      })
    })
  },
});

export const {
  addToCart,
  decrementItem,
  incrementItem,
  checkedItem,
  getTotalPrice,
  checkedAllItem,
  getCartsChecked,
  removeItemCarts,
  removeItemCheckedCarts,
  removeAllItemCheckedCarts
} = cartSlice.actions;
export default cartSlice.reducer;
