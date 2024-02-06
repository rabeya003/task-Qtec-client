import { createBrowserRouter } from "react-router-dom";

import Roots from "./Roots";
import ErrorPage from "../Components/ErrorPage";
import Home from "../Components/Home";
import Addtask from "../Components/Addtask";
import EditTask from "../Components/EditTask";
import AllLists from "../Components/AllLists";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Roots></Roots>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/add",
        element: <Addtask></Addtask>,
      },
      {
        path: "/edit/:id",
        element: <EditTask></EditTask>,
      },
      {
        path: "/lists",
        element: <AllLists></AllLists>,
      },
    ],
  },
]);
