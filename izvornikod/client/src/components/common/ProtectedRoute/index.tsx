import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import ROLE from "../../../types/enums/Role";
import Error from "../../../screens/Error";
import { RootState, useAppDispatch } from "../../../redux/store";
import { fetchCurrentUser } from "../../../redux/slices/authSlice";

interface Props {
  uloge: Array<ROLE>,
}

const ProtectedRoute = ({ uloge }: Props) => {
  const { user, authenticated } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user === undefined) {
      dispatch(fetchCurrentUser());
    }
  }, []);

  const userCanAccess = user !== undefined && uloge.includes(user.role);

  if (!authenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (authenticated && !userCanAccess) {
    return <Error errorText="Nemate ovlasti za pristup ovoj stranici." />;
  }

  return <Outlet />;
}

export default ProtectedRoute;