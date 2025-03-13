import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router";
import {
  Home,
  TeacherLayout,
  TeacherSignUp,
  TeacherLogin,
  TeacherDashBoard,
  TeacherLogout,
  StudentLayout,
  StudentSignUp,
  StudentLogin,
  StudentDashBoard,
  StudentLogout,
  StudentScanner,
} from "./pages";
import store from "./app/store";
import { Provider } from "react-redux";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<Home />} />

      <Route path="/teacher" element={<TeacherLayout />}>
        <Route path="signup" element={<TeacherSignUp />} />
        <Route path="login" element={<TeacherLogin />} />
        <Route path="dashboard" element={<TeacherDashBoard />} />
        <Route path="logout" element={<TeacherLogout />} />
      </Route>

      <Route path="/student" element={<StudentLayout />}>
        <Route path="signup" element={<StudentSignUp />} />
        <Route path="login" element={<StudentLogin />} />
        <Route path="dashboard" element={<StudentDashBoard />} />
        <Route path="logout" element={<StudentLogout />} />
        <Route path="scan" element={<StudentScanner />} />
      </Route>
    </Route>
  )
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
