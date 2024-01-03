import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// Screens and components
import Login from "./Login";
import AdminInfo from "./AdminInfo";
import StudentInfo from "./StudentInfo";
import Error from "./Error";
import Register from "./Register";
import AdminList from "./AdminList";
import StudyTypes from "./StudyTypes";
import EditPassword from "./EditPassword";
import CreateWord from "./CreateWord";
import ForeignTranslation from "./ForeignTranslation";
import Dictionaries from "./Dictionaries";
import ProtectedRoute from "../components/common/ProtectedRoute";
import EditDictionary from "./EditDictionary";
import SelectLanguage from "./SelectLanguage";

// local imports
import route from "../constants/route";
import ROLE from "../types/enums/Role";
import store from "../redux/store";
import { fetchDictionaries } from "../redux/slices/dictionariesSlice";
import Words from "./Words";
import { fetchWords } from "../redux/slices/wordsSlice";

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<ProtectedRoute uloge={[ROLE.Admin]} />}>
        <Route path={`${route.adminInfo}`} element={<AdminInfo />} />
        <Route path={`${route.editPassword}`} element={<EditPassword />} />
        <Route path={`${route.editDictionary}`} element={<EditDictionary />} />
        <Route
          path={`${route.dictionaries}`}
          element={<Dictionaries />}
          loader={() => {
            // hardkodiran languageid, prominit kad dodamo odabir jezika
            store.dispatch(fetchDictionaries(1));
            return true;
          }}
        />
        <Route
          path={`${route.words}`} element={<Words />}
          loader={() => {
            store.dispatch(fetchWords(2));
            return true;
          }}
        />
      </Route>
      <Route element={<ProtectedRoute uloge={[ROLE.Student]} />}>
        <Route path={`${route.studentInfo}`} element={<StudentInfo />} />
        <Route
          path={`${route.foreignTranslation}`}
          element={<ForeignTranslation />}
        />
        <Route path={`${route.studyTypes}`} element={<StudyTypes />} />
      </Route>
      <Route path={`${route.login}`} element={<Login />} />
      <Route path={`${route.register}`} element={<Register />} />
      <Route path={`${route.adminList}`} element={<AdminList />} />
      <Route path={`${route.createWord}`} element={<CreateWord />} />
      <Route path={`${route.selectLanguage}`} element={<SelectLanguage />} />
      <Route path="*" element={<Error errorText="Stranica ne postoji." />} />
    </>
  )
);

export default appRouter;
