import { createBrowserRouter } from "react-router-dom";

import Roots from "./Roots";
import ErrorPage from "../Components/ErrorPage";
import Home from "../Components/Home";
import Addtask from "../Components/Addtask";
import EditTask from "../Components/EditTask";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Roots></Roots>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/home",
        element: <Home></Home>,
      },
      {
        path: "/add",
        element: <Addtask></Addtask>,
      },
      {
        path: "edit",
        element: <EditTask></EditTask>,
      },
    ],
  },
]);
