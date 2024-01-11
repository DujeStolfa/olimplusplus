import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// Screens and components
import Login from "./Login";
import AdminInfo from "./AdminInfo";
import StudentInfo from "./StudentInfo";
import Error from "../components/common/Error";
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
import StudentDictionaries from "./StudentDictionaries";
import Words from "./Words";
import AddWords from "./AddWords";
import Study from "./Study";
import AppDrawerStudents from "./AppDrawerStudents";
import AppDrawerAdmins from "./AppDrawerAdmins";

// local imports
import route from "../constants/route";
import ROLE from "../types/enums/Role";
import store from "../redux/store";
import { fetchDictionaries } from "../redux/slices/dictionariesSlice";
import { fetchWords } from "../redux/slices/wordsSlice";
import { fetchStudentDictionaries } from "../redux/slices/studentDictionariesSlice";
import { fetchAvailableWords } from "../redux/slices/studySessionSlice";
import { fetchLanguages } from "../redux/slices/languageSlice";

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<ProtectedRoute uloge={[ROLE.Admin]} />}>
        <Route path={`${route.adminInfo}`} element={<AdminInfo />} />
        <Route element={<AppDrawerAdmins />}>
          <Route
            path={`${route.selectLanguage}/admin`}
            element={<SelectLanguage />}
            loader={() => {
              store.dispatch(fetchLanguages());
              return true;
            }}
          />
          <Route path={`${route.editPassword}`} element={<EditPassword />} />
          <Route path={`${route.editDictionary}`} element={<EditDictionary />} />
          <Route
            path={`${route.dictionaries}`}
            element={<Dictionaries />}
            loader={() => {
              const { languages } = store.getState();

              if (languages.selectedLanguage === undefined) {
                return false;
              }

              store.dispatch(fetchDictionaries(languages.selectedLanguage.languageid));
              return true;
            }}
          />
          <Route
            path={`${route.words}`} element={<Words />}
            loader={() => {
              const { languages } = store.getState();

              if (languages.selectedLanguage === undefined) {
                return false;
              }

              store.dispatch(fetchWords(languages.selectedLanguage.languageid));
              return true;
            }}
          />
          <Route path={`${route.addWords}`} element={<AddWords />} />
          <Route path={`${route.adminList}`} element={<AdminList />} />
        </Route>
      </Route>
      <Route element={<ProtectedRoute uloge={[ROLE.Student]} />}>
        <Route element={<AppDrawerStudents />}>
          <Route
            path={`${route.selectLanguage}/student`}
            element={<SelectLanguage />}
            loader={() => {
              store.dispatch(fetchLanguages());
              return true;
            }}
          />

          <Route
            path={`${route.selectDictionary}`}
            element={<StudentDictionaries />}
            loader={() => {
              const { auth, languages } = store.getState();

              if (auth.user === undefined || languages.selectedLanguage === undefined) {
                return false;
              }


              store.dispatch(fetchStudentDictionaries({ languageid: languages.selectedLanguage.languageid, studentid: auth.user.userid }));
              return true;
            }}
          />
          <Route
            path={`${route.study}`}
            element={<Study />}
            loader={() => {
              store.dispatch(fetchAvailableWords(1));
              return true;
            }}
          />
        </Route>


        <Route path={`${route.studentInfo}`} element={<StudentInfo />} />
        <Route
          path={`${route.foreignTranslation}`}
          element={<ForeignTranslation />}
        />
        <Route path={`${route.studyTypes}`} element={<StudyTypes />} />
      </Route>
      <Route path={`${route.login}`} element={<Login />} />
      <Route path={`${route.register}`} element={<Register />} />
      <Route path={`${route.createWord}`} element={<CreateWord />} />
      <Route path="*" element={<Error errorText="Stranica ne postoji." />} />
    </>
  )
);

export default appRouter;
