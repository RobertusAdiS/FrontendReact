import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  products: [],
  error: "",
  response: "",
};

//get all products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/products`
    );
    return response.data;
  }
);

//add a product
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/products`,
        {
          title: data.title,
          description: data.description,
          price: data.price,
          imageUrl: data.imgURL,
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error creating product:",
        error.response ? error.response.data : error.message
      );
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

//remove a product
export const removeProduct = createAsyncThunk(
  "products/removeProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/products/${id}`
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error deleting product:",
        error.response ? error.response.data : error.message
      );
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

//update a product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/products/${data.id}`,
        {
          title: data.title,
          description: data.description,
          price: data.price,
          imageUrl: data.imgURL,
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error updating product:",
        error.response ? error.response.data : error.message
      );
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

//product slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearResponse: (state) => {
      state.response = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
        state.response = "add";
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product._id !== action.payload._id
        );
        state.response = "delete";
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (product) => product._id === action.payload._id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        state.response = "update";
      });
  },
});

export default productSlice.reducer;
export const { clearResponse } = productSlice.actions;
