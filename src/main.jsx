import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./Router";
import { AuthProvider } from "./context/AuthContext";
import { EmployeeProvider } from "./context/EmployeeContext";
import { ActivityProvider } from "./context/ActivityContext";
import { ErrorBoundary } from "./ErrorBoundary";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <EmployeeProvider>
          <ActivityProvider>
            <RouterProvider router={router} />
          </ActivityProvider>
        </EmployeeProvider>
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>
);