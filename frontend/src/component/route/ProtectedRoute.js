import React from "react";
import { Route, Redirect } from "react-router-dom";
const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const getUsername = localStorage.getItem("username");
  const getStatus = localStorage.getItem("status");
  const username = JSON.parse(getUsername);
  const status = JSON.parse(getStatus);

  return (
        <Route
          {...rest}
          render={(props) => {
            if (!username&&!status) {
              return <Redirect to="/login" />;
            }
            if (isAdmin===true &&status==="0") {
              return <Redirect to="/service_bill" />;
            } 
            if (isAdmin===false &&status==="1") {
              return <Redirect to="/home" />;
            } 
            return <Component {...props} />;
          }}
        />
  );
};

export default ProtectedRoute;