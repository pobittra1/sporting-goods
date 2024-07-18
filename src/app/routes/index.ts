import { Router } from "express";
import { productRoute } from "../modules/product/product.route";
import { userRoute } from "../modules/user/user.route";
const router = Router();
const Routes = [
  {
    path: "/product",
    route: productRoute,
  },
  {
    path: "/user",
    route: userRoute,
  },
];

Routes.forEach((route) => router.use(route.path, route.route));

export default router;
