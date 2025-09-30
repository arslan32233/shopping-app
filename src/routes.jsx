
import ProductList from "./Pages/ProductList";
import ProductDetail from "./Pages/ProductDetail";
import CartPage from "./Pages/CartsPage";
const routes = [
  {
    path: "/",
    element: <ProductList />,
  },
  {
    path: "/product/:id",
    element: <ProductDetail />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
];

export default routes;
