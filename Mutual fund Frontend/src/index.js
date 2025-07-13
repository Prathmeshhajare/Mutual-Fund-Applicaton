import App from "./App";
import ReactDOM from 'react-dom/client'; 
import ErrorPage from "./Components/ErrorPage";
import Home from "./Components/Home";
import LoginUser from "./Components/User/LoginUser";
import RegisterUser from "./Components/User/RegisterUser";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AddMutualFund from "./Components/Mutual Fund/AddMutualFund";
import MutualFund from "./Components/Mutual Fund/MutualFund";
import { LoginProvider } from "./Context/LoginContext";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import UpdateFund from "./Components/Mutual Fund/UpdateFund";
import BuyFund from "./Components/Transaction/BuyFund";
import Receipt from "./Components/Transaction/Receipt";
import MyTransactions from "./Components/Transaction/MyTransactions";
import SellFunds from "./Components/Transaction/SellFunds";
import 'bootstrap-icons/font/bootstrap-icons.css';
const routes=createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    errorElement:<ErrorPage/>,
    children:[
      {
        index:true,
        element:<Home/>,
      },
      
      {
        path:'/register',
        element:<RegisterUser/>,
      },
      {
        path:'/login',
        element:<LoginUser/>,
      },
      {path:"/admin",
        element:<AdminDashboard/>
      },
      {
        path:"/funds",
        element:<MutualFund/>
      },
      {
        path:"/add-fund",
        element:<AddMutualFund/>
      },
      {
         path:"/admin/update-fund/:fundId",
         element:<UpdateFund/>
      }, {
        path:"/buy-fund/:fundId",
        element:<BuyFund/>
      },
      {
        path: "/sell-fund/:userId/:fundId",
        element:<SellFunds/>
      },
      {
        path:"/receipt/:userId/:mutualFundId",
        element:<Receipt/>
      },
      {
        path:"/transactions",
        element:<MyTransactions/>
      }
    ]
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <LoginProvider>
  <RouterProvider router={routes} >
    <App/>
    </RouterProvider>
   </LoginProvider>
   
);
