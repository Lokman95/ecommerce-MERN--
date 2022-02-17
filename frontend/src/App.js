import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ProductDetails from "./components/ProductDetails";
import ProductScreen from "./screens/ProductScreen";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SearchScreen from "./screens/SearchScreen";
import Login from "./components/User/Login";
import SignUp from "./components/User/SignUp";
import { useEffect, useState } from "react";
import store from "./redux/store";
import { loadUser } from "./redux/actions/userAction";
import Profile from "./components/User/Profile";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ResetPassword from "./components/User/ResetPassword";
import AuthenticatedRoute from "./components/AuthenticatedRoute/Route";
import ForgotPassword from "./components/User/ForgotPassword";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import Payment from "./components/Cart/Payment";
import OrderSuccess from "./components/OrderSuccess";
import MyOrders from "./components/User/MyOrders";
import MyOrderDetails from "./components/User/MyOrderDetails";
import Dashboard from "./components/Admin/Dashboard";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import AdminProductList from "./components/Admin/AdminProductList";
import CreateProduct from "./components/Admin/CreateProduct";
import UpdateProduct from "./components/Admin/UpdateProduct";
import Orders from "./components/Admin/Orders";
import UpdateOrder from "./components/Admin/UpdateOrder";
import UserList from "./components/Admin/UserList";
import UpdateUserRole from "./components/Admin/UpdateUserRole";
import UpdateReviews from "./components/Admin/UpdateReviews";
import Contact from "./screens/Contact";
import NotFound from "./components/NotFound";
function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");
  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);
  return (
    <Router>
      <Navbar />

      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <AuthenticatedRoute
            exact
            path="/process/payment"
            component={Payment}
          />
        </Elements>
      )}

      <Switch>
        <AuthenticatedRoute exact path="/success" component={OrderSuccess} />
        <AuthenticatedRoute exact path="/orders" component={MyOrders} />
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:id" component={ProductDetails} />
        <Route exact path="/products" component={ProductScreen} />
        <Route path="/products/:keyword" component={ProductScreen} />
        <Route exact path="/search" component={SearchScreen} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />

        <Route exact path="/password/reset/:token" component={ResetPassword} />
        <Route exact path="/password/forgot" component={ForgotPassword} />
        <Route exact path="/cart" component={Cart} />
        <AuthenticatedRoute exact path="/account" component={Profile} />
        <AuthenticatedRoute exact path="/me/update" component={UpdateProfile} />
        <AuthenticatedRoute
          exact
          path="/password/update"
          component={UpdatePassword}
        />
        <AuthenticatedRoute exact path="/shipping" component={Shipping} />
        <AuthenticatedRoute
          exact
          path="/order/confirm"
          component={ConfirmOrder}
        />
        <AuthenticatedRoute
          exact
          path="/order/:id"
          component={MyOrderDetails}
        />

        <AuthenticatedRoute
          isAdmin={true}
          exact
          path="/admin/dashboard"
          component={Dashboard}
        />
        <AuthenticatedRoute
          isAdmin={true}
          exact
          path="/admin/products"
          component={AdminProductList}
        />
        <AuthenticatedRoute
          isAdmin={true}
          exact
          path="/admin/product"
          component={CreateProduct}
        />

        <AuthenticatedRoute
          exact
          path="/admin/product/:id"
          isAdmin={true}
          component={UpdateProduct}
        />

        <AuthenticatedRoute
          exact
          path="/admin/orders"
          isAdmin={true}
          component={Orders}
        />
        <AuthenticatedRoute
          exact
          path="/admin/order/:id"
          isAdmin={true}
          component={UpdateOrder}
        />

        <AuthenticatedRoute
          exact
          path="/admin/users"
          isAdmin={true}
          component={UserList}
        />
        <AuthenticatedRoute
          exact
          path="/admin/user/:id"
          isAdmin={true}
          component={UpdateUserRole}
        />

        <AuthenticatedRoute
          exact
          path="/admin/reviews"
          isAdmin={true}
          component={UpdateReviews}
        />
        <Route
          component={
            window.location.pathname === "/process/payment" ? null : NotFound
          }
        />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
