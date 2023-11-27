
import './App.css';
import {useValue} from './contextData';
import { Navigate, RouterProvider } from "react-router-dom";
import Navbar from './component/Navbar';
import Register from './component/UserInfo/Signup';
import Cart from './component/CartPage/CartPage';
import MyOrder from './component/MyOrder/MyOrder'
import { createBrowserRouter } from "react-router-dom";
import Homepage from './component/HomePage/HomePage';
import Signin from './component/UserInfo/signIn';


function App() {
  // import all the require things from context data
  const {userName} = useValue();

  // given the route to all the section
  const router = createBrowserRouter([
    {
        path: '/', element: <Navbar/>,
        children:[
          {index:true, element:<Homepage/>},
          {path: "/signup", element:<Register/>},
          {path: "/cart", element:userName.userEmail? <Cart/>:<Navigate to="/" />},
          {path:"/Order", element:userName.userEmail?<MyOrder/>:<Navigate to="/" />},
          {path: "/signin", element: <Signin/>}
        ]
    }
])
 
  return (
    <div className="App">
      <RouterProvider router={router}/>
      
    </div>
  );
}

export default App;


