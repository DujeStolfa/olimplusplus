import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import Login from "./Login";
import AdminInfo from "./AdminInfo";
import StudentInfo from "./StudentInfo";
import Error from "./Error";
import Register from "./Register";
import CreateAdmin from "./CreateAdmin";
import StudyTypes from "./StudyTypes";
import EditPassword from "./EditPassword";

import route from "../constants/route";
import ProtectedRoute from "../components/common/ProtectedRoute";
import ROLE from "../types/enums/Role";
import ForeignTranslation from "./ForeignTranslation";


const appRouter = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route element={<ProtectedRoute uloge={[ROLE.Admin]} />}>
                <Route path={`${route.adminInfo}`} element={<AdminInfo />} />
                <Route path={`${route.editPassword}`} element={<EditPassword />} />
            </Route>
            <Route element={<ProtectedRoute uloge={[ROLE.Student]} />}>
                <Route path={`${route.studentInfo}`} element={<StudentInfo />} />
            </Route>
            <Route path={`${route.login}`} element={<Login />} />
            <Route path={`${route.register}`} element={<Register />} />
            <Route path={`${route.createAdmin}`} element={<CreateAdmin />} />
            <Route path={`${route.studyTypes}`} element={<StudyTypes />} />
            <Route path={`${route.foreignTranslation}`} element={<ForeignTranslation />} />
            <Route path="*" element={<Error errorText="Stranica ne postoji." />} />
        </>
    )
);

export default appRouter;