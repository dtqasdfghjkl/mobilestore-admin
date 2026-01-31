import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./app.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import CategoryList from "./pages/categoryList/CategoryList";
import Category from "./pages/category/Category";
import NewCategory from "./pages/newCategory/NewCategory";
import TransactionList from "./pages/transactionList/TransactionList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Transaction from "./pages/transaction/Transaction";
import Login from "./pages/login/Login";
import AuthContext from "./auth-context";
import { useState } from "react";
import Message from "./pages/message/Message";

function App() {
  const [authStatus, setAuthStatus] = useState(false);
  const login = () => {
    setAuthStatus(true);
  };
  const logout = () => {
    setAuthStatus(false);
  }

  return (
    <AuthContext.Provider value={{ status: authStatus, login: login , logout: logout}}>
      <Router className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="*"
            element={
              <>
                <Topbar />
                <div className="container">
                  <ToastContainer />
                  <Sidebar />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/users" element={<UserList />} />
                    <Route path="/users/:userId" element={<User />} />
                    <Route path="/newUser" element={<NewUser />} />
                    <Route path="/products" element={<ProductList />} />
                    <Route path="/products/:productId" element={<Product />} />
                    <Route path="/newProduct" element={<NewProduct />} />
                    <Route path="/categories" element={<CategoryList />} />
                    <Route
                      path="/categories/:categoryId"
                      element={<Category />}
                    />
                    <Route path="/newCategory" element={<NewCategory />} />
                    <Route path="/transaction" element={<TransactionList />} />
                    <Route
                      path="/transaction/:transactionId"
                      element={<Transaction />}
                    />
                    <Route path="/message" element={<Message />} />
                  </Routes>
                </div>
              </>
            }
          />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
