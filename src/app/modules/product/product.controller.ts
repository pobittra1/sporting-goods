import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { productService } from "./product.service";

//destructure services
const { addProductIntoDB, getSingleProductFromDB, deleteProductFromDB } =
  productService;

const addProduct = catchAsync(async (req, res) => {
  const result = await addProductIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product is added successfully !",
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await getSingleProductFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product is retrieved succesfully !",
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await deleteProductFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product deleted successfully",
    data: result,
  });
});

export const productController = {
  addProduct,
  getSingleProduct,
  deleteProduct,
};
