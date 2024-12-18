import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Box, Button, TextField, Snackbar, Alert } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  addProduct,
  removeProduct,
  updateProduct,
} from "../../features/productSlice";

const Product = () => {
  // Initialize dispatch function from Redux
  const dispatch = useDispatch();

  // Get products, loading, error, and response state from Redux store
  const { products, loading, error, response } = useSelector(
    (state) => state.products
  );

  // Local state for new product details
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: "",
    imgURL: "",
  });

  // Local state for the ID of the product being updated
  const [id, setId] = useState("");

  // Local state to track if the form is in update mode
  const [updateState, setUpdateState] = useState(false);

  // Fetch products when the component mounts
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Handle input changes for the new product form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission for adding a new product
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(addProduct(newProduct));
    handleClickSnackbar();
    setNewProduct({
      title: "",
      description: "",
      price: "",
      imgURL: "",
    });
  };

  // Set the form to update mode with the selected product details
  const updateProductDetails = (product) => {
    setId(product._id);
    setNewProduct({
      title: product.title,
      description: product.description,
      price: product.price,
      imgURL: product.imgURL,
    });
    setUpdateState(true);
  };

  // Handle form submission for updating a product
  const updateForm = () => {
    dispatch(updateProduct({ id, ...newProduct }));
    setUpdateState(false);
    handleClickSnackbar();
    setId("");
    setNewProduct({
      title: "",
      description: "",
      price: "",
      imgURL: "",
    });
  };

  // Handle product deletion
  const deleteProduct = (id) => {
    dispatch(removeProduct(id)).then(() => {
      dispatch(fetchProducts());
      handleClickSnackbar();
    });
  };

  // Local state for Snackbar visibility
  const [open, setOpen] = useState(false);

  // Show Snackbar
  const handleClickSnackbar = () => {
    setOpen(true);
  };

  // Hide Snackbar
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 5,
        color: "white",
      }}
    >
      <Box
        sx={{
          width: "30%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mr: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {/* Form for adding/updating a product */}
          <TextField
            sx={{ color: "white" }}
            variant="outlined"
            size="small"
            placeholder="Title"
            name="title"
            value={newProduct.title}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            size="small"
            placeholder="Description"
            name="description"
            value={newProduct.description}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            size="small"
            placeholder="Price"
            name="price"
            value={newProduct.price}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            size="small"
            placeholder="Image URL"
            name="imgURL"
            value={newProduct.imgURL}
            onChange={handleChange}
          />
          {updateState ? (
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={updateForm}
            >
              Update
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleClick}
            >
              Add
            </Button>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          width: "70%",
        }}
      >
        <TableContainer component={Paper} sx={{ marginTop: "16px" }}>
          <Table sx={{ minWidth: 659 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#4b4d5c" }}>
                <TableCell align="left">
                  <Typography sx={{ fontWeight: 600, color: "white" }}>
                    No
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography sx={{ fontWeight: 600, color: "white" }}>
                    Title
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography sx={{ fontWeight: 600, color: "white" }}>
                    Description
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography sx={{ fontWeight: 600, color: "white" }}>
                    Price
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography sx={{ fontWeight: 600, color: "white" }}>
                    Image
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography sx={{ fontWeight: 600, color: "white" }}>
                    Actions
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>

            {/* Display products */}
            <TableBody>
              {loading ? <TableCell> Loading... </TableCell> : null}
              {!loading && products.length === 0 ? (
                <TableCell> No Records </TableCell>
              ) : null}
              {!loading && error ? <TableCell> {error} </TableCell> : null}
              {products &&
                products.map((product, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="left">
                      <Typography> {index + 1} </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography> {product.title} </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography> {product.description} </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography> {product.price} </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <img
                        src={product.imgURL}
                        alt={product.title}
                        width="50"
                      />
                    </TableCell>
                    <TableCell align="left">
                      <Box sx={{ display: "flex", cursor: "pointer" }}>
                        <Box
                          sx={{ color: "#707cd4", mr: 1 }}
                          onClick={() => updateProductDetails(product)}
                        >
                          <EditIcon />
                        </Box>
                        <Box
                          sx={{ color: "red" }}
                          onClick={() => deleteProduct(product._id)}
                        >
                          <DeleteIcon />
                        </Box>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
          {response === "add"
            ? "Product added successfully"
            : response === "delete"
            ? "Product deleted successfully"
            : response === "update"
            ? "Product updated successfully"
            : null}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Product;
