import { Router } from "express";
import { productRoute } from "../modules/product/product.route";
const router = Router();
const Routes = [
  {
    path: "/product",
    route: productRoute,
  },
];

Routes.forEach((route) => router.use(route.path, route.route));

export default router;
