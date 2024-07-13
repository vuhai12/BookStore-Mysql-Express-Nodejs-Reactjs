import userReducer from './slides/userSlice';
import bookReducer from './slides/bookSlice';
import cartReducer from "./slides/cartSlice";
import orderReducer from "./slides/orderSlice";
import profileUserReducer from "./slides/profileUserSlice";
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import localforage from 'localforage';
import { useDispatch } from 'react-redux'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  // storage: localforage,
  storage: storage,
  whitelist:['']
}

const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  order:orderReducer,
  book:bookReducer,
  profileUser:profileUserReducer,

});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})



export const persistor = persistStore(store)




