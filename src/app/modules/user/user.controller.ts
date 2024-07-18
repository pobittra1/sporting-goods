import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userService } from "./user.service";

//destructure service
const { addUserIntoDB } = userService;

const addUser = catchAsync(async (req, res) => {
  const result = await addUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User created successfully !",
    data: result,
  });
});

export const userController = {
  addUser,
};
