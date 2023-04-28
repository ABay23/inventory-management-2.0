import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productService from './productService'
import { toast } from 'react-toastify'

const initialState = {
  product: null,
  products: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  inventoryValue: 0,
  category: [],
}

//* create New Product

export const createProduct = createAsyncThunk(
  'products/create',
  async (formData, thunkAPI) => {
    try {
      return await productService.createProduct(formData)
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.message) ||
        error.message ||
        error.toString()
      console.log(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//* Get All Products

export const getAllProducts = createAsyncThunk(
  'products/get',
  async (_, thunkAPI) => {
    try {
      return await productService.getAllProducts()
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.message) ||
        error.message ||
        error.toString()
      console.log(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//* Delete a product

export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (id, thunkAPI) => {
    try {
      return await productService.deleteProduct(id)
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.message) ||
        error.message ||
        error.toString()
      console.log(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    CALC_INVENTORY_VALUE(state, action) {
      const product = action.payload
      const array = []

      product.map((item) => {
        const { price, quantity } = item
        const productValue = price * quantity

        return array.push(productValue)
      })
      const totalValue = array.reduce((act, tot) => {
        return tot + act
      }, 0)
      state.totalInventoryValue = totalValue
    },
    CALC_FOOD_VALUE(state, action) {
      const product = action.payload
      const array = []

      product.filter((item) => {
        const { price, quantity } = item
        const productValue = price * quantity

        return array.push(productValue)
      })
      const totalValue = array.reduce((act, tot) => {
        return tot + act
      }, 0)
      state.totalInventoryValue = totalValue
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        // console.log(action.payload)
        state.products.push(action.payload)
        toast.success('Product Added Successfully')
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      })
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        // console.log(action.payload)
        state.products = action.payload
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        toast.success('Product Deleted!')
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      })
  },
})

export const { CALC_INVENTORY_VALUE } = productSlice.actions

export const selectTotalInventoryValue = (state) =>
  state.product.totalInventoryValue

export default productSlice.reducer
