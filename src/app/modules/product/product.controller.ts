import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { productService } from "./product.service";

//destructure services
const { addProductIntoDB } = productService;

const addProduct = catchAsync(async (req, res) => {
  const result = await addProductIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product is added successfully !",
    data: result,
  });
});

export const productController = {
  addProduct,
};
