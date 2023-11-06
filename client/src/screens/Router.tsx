import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Login from "./Login";

const appRouter = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route path="/login" element={<Login />} />
        </Route>
    )
);

export default appRouter;