
import './App.css';
import CustomItemContext from './contextData';
import { RouterProvider } from "react-router-dom";
import Navbar from './component/Navbar';
import Register from './component/RegisterApp/Signup';
import { createBrowserRouter } from "react-router-dom";
import { useState } from 'react';
import Homepage from './component/HomePage/HomePage';



function App() {
  const router = createBrowserRouter([
    {
        path: '/', element: <Navbar/>,
        children:[
          {index:true, element:<Homepage/>},
            {path: "/signup", element:<Register/>}
        ]
    }
])
 
  return (
    <CustomItemContext>
    <div className="App">
      <RouterProvider router={router}/>
      
    </div>
    </CustomItemContext>
  );
}

export default App;

