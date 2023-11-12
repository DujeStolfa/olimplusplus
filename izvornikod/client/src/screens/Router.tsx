import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import Login from "./Login";
import AdminInfo from "./AdminInfo";
import StudentInfo from "./StudentInfo";
import Error from "./Error";

import route from "../constants/route";
import ProtectedRoute from "../components/common/ProtectedRoute";
import ULOGA from "../types/enums/Uloga";


const appRouter = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route element={<ProtectedRoute uloge={[ULOGA.Admin]} />}>
                <Route path={`${route.adminInfo}`} element={<AdminInfo />} />
            </Route>
            <Route element={<ProtectedRoute uloge={[ULOGA.Ucenik]} />}>
                <Route path={`${route.studentInfo}`} element={<StudentInfo />} />
            </Route>
            <Route path={`${route.login}`} element={<Login />} />
            <Route path="*" element={<Error errorText="Stranica ne postoji." />} />
        </>
    )
);

export default appRouter;