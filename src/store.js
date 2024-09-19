import { configureStore } from '@reduxjs/toolkit'
import Vname from './Slices/userslice'

export default configureStore({
  reducer: {
    info: Vname,
  },
})

