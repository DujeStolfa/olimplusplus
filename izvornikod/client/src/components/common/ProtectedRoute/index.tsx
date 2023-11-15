import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import ULOGA from "../../../types/enums/Uloga";
import Error from "../../../screens/Error";
import { RootState, useAppDispatch } from "../../../redux/store";
import { fetchCurrentUser } from "../../../redux/slices/authSlice";

interface Props {
  uloge: Array<ULOGA>,
}

const ProtectedRoute = ({ uloge }: Props) => {
  const { korisnik, authenticated } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (korisnik === undefined) {
      dispatch(fetchCurrentUser());
    }
  }, []);

  const userCanAccess = korisnik !== undefined && uloge.includes(korisnik.uloga);

  if (!authenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (authenticated && !userCanAccess) {
    return <Error errorText="Nemate ovlasti za pristup ovoj stranici." />;
  }

  return <Outlet />;
}

export default ProtectedRoute;