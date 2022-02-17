import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const AuthenticatedRoute = ({
  isAdmin,
  component: Component,
  ...restItems
}) => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.user);
  return (
    <>
      {loading === false && (
        <Route
          {...restItems}
          render={(props) => {
            if (isAuthenticated === false) {
              return <Redirect to="/login" />;
            }
            if (isAdmin === true && user.role !== "admin") {
              return <Redirect to="/login" />;
            }
            return <Component {...props} />;
          }}
        />
      )}
    </>
  );
};

export default AuthenticatedRoute;
