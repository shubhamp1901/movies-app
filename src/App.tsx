import './App.css';
import Bollywood from './components/Bollywood';
import Hollywood from './components/Hollywood';
import HomeRedirect from './components/HomeRedirect';
import Layout from './components/Layout';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Shows from './components/Shows';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true, // root path "/"
        element: <HomeRedirect />,
      },
      {
        path: "bollywood-movies",
        element: <Bollywood />,
      },
      {
        path: "hollywood-movies",
        element: <Hollywood />,
      },
       {
        path: "tv-shows",
        element: <Shows />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;
