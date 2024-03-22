import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from "./component/Register/Register";
import Login from "./component/Login/Login";
import NotFound from "./component/NotFound/NotFound";
import Home from "./component/Home/Home";
import Brands from "./component/Brands/Brands";
import Cart from "./component/Cart/Cart";
import Products from "./component/Products/Products";
import Layout from "./component/Layout/Layout";
import Categories from "./component/Categories/Categories";
import AuthContextProvider from "./Context/AuthContext";
import ProtectedRoute from "./component/ProtectedRoute/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductDetails from "./component/ProductDetails/ProductDetails";
import CategoriesSpecific from "./component/CategoriesSpecific/CategoriesSpecific";
import AddProductToCartProvider from "./Context/AddProductToCart";
import { Toaster } from "react-hot-toast";
import Payment from "./component/PayMent/Payment";
import AllOrders from "./component/AllOrders/AllOrders";
import WishList from "./component/WishList/WishList";
import AddWishListProvider from "./Context/addWishList";
import { Offline } from "react-detect-offline";



const myRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      {
        path: "home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "Brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <AllOrders />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "ProductDetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "categoriesSpecific/:id",
        element: (
          <ProtectedRoute>
            <CategoriesSpecific />
          </ProtectedRoute>
        ),
      },
      {
        path: "Products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishList",
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <AddProductToCartProvider>
            <AddWishListProvider>
            <RouterProvider router={myRouter} />
            </AddWishListProvider>
          </AddProductToCartProvider>
        </AuthContextProvider>
      </QueryClientProvider>
      <Toaster/>
      <Offline>
        <div className="bg-black text-white fixed-bottom fs-6">You're offline right now. Check your connection.</div>
      </Offline>
    </>
  );
}

export default App;
