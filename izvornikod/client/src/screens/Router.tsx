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
import {
  clearDictionary,
  fetchDictionaries,
} from "../redux/slices/dictionariesSlice";
import {
  clearHelperText,
  clearSelectedEditWord,
  clearWordsInDict,
  fetchWordDetails,
  fetchWords,
  fetchWordsInDictionary,
  fetchWordsNotInDictionary,
} from "../redux/slices/wordsSlice";
import {
  clearSelectedDictionary,
  fetchStudentDictionaries,
} from "../redux/slices/studentDictionariesSlice";
import {
  clearSession,
  fetchAvailableWords,
} from "../redux/slices/studySessionSlice";
import {
  clearSelectedLanguage,
  fetchLanguages,
} from "../redux/slices/languageSlice";
import { fetchAdmins } from "../redux/slices/adminSlice";
import EditWord from "./EditWord";

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
              store.dispatch(clearDictionary());
              store.dispatch(clearWordsInDict());
              return true;
            }}
          />
          <Route path={`${route.editPassword}`} element={<EditPassword />} />
          <Route
            path={`${route.editDictionary}/:dictionaryid`}
            element={<EditDictionary />}
            loader={({ params }) => {
              if (params.dictionaryid !== undefined) {
                store.dispatch(clearSelectedEditWord());
                const { words } = store.getState();

                if (words.wordsInDictionary.length === 0) {
                  store.dispatch(
                    fetchWordsInDictionary(parseInt(params.dictionaryid))
                  );
                }

                return true;
              }
              return false;
            }}
          />
          <Route
            path={`${route.dictionaries}`}
            element={<Dictionaries />}
            loader={() => {
              store.dispatch(clearDictionary());
              store.dispatch(clearWordsInDict());
              const { languages } = store.getState();

              if (languages.selectedLanguage === undefined) {
                return false;
              }

              store.dispatch(
                fetchDictionaries(languages.selectedLanguage.languageid)
              );
              return true;
            }}
          />
          <Route
            path={`${route.words}`}
            element={<Words />}
            loader={() => {
              store.dispatch(clearHelperText());
              store.dispatch(clearWordsInDict());
              const { languages, words } = store.getState();

              if (languages.selectedLanguage === undefined) {
                return false;
              }

              if (words.selectedEditWord === undefined) {
                store.dispatch(fetchWords(languages.selectedLanguage.languageid));
              } else {
                store.dispatch(clearSelectedEditWord());
              }
              return true;
            }}
          />
          <Route
            path={`${route.addWords}`}
            element={<AddWords />}
            loader={() => {
              const { dictionaries } = store.getState();

              if (dictionaries.selectedDictionary === undefined) {
                return false;
              }

              store.dispatch(
                fetchWordsNotInDictionary(
                  dictionaries.selectedDictionary.dictionaryid
                )
              );
              return true;
            }}
          />
          <Route
            path={`${route.adminList}`}
            element={<AdminList />}
            loader={() => {
              store.dispatch(fetchAdmins());
              return true;
            }}
          />
          <Route
            path={`${route.createWord}`}
            element={<CreateWord />}
            loader={() => {
              store.dispatch(clearHelperText());
              return true;
            }}
          />
          <Route
            path={`${route.editWord}/:wordid`}
            element={<EditWord />}
            loader={({ params }) => {
              if (params.wordid !== undefined) {
                store.dispatch(fetchWordDetails(parseInt(params.wordid)));
                store.dispatch(clearHelperText());
                return true;
              }

              return false;
            }}
          />
        </Route>
      </Route>
      <Route element={<ProtectedRoute uloge={[ROLE.Student]} />}>
        <Route element={<AppDrawerStudents />}>
          <Route
            path={`${route.selectLanguage}/student`}
            element={<SelectLanguage />}
            loader={() => {
              store.dispatch(fetchLanguages());
              store.dispatch(clearSession());
              store.dispatch(clearSelectedLanguage());
              store.dispatch(clearSelectedDictionary());
              return true;
            }}
          />

          <Route
            path={`${route.selectDictionary}`}
            element={<StudentDictionaries />}
            loader={() => {
              store.dispatch(clearSession());
              store.dispatch(clearSelectedDictionary());
              const { auth, languages } = store.getState();

              if (
                auth.user === undefined ||
                languages.selectedLanguage === undefined
              ) {
                return false;
              }

              store.dispatch(
                fetchStudentDictionaries({
                  languageid: languages.selectedLanguage.languageid,
                  studentid: auth.user.userid,
                })
              );
              return true;
            }}
          />

          <Route
            path={`${route.study}`}
            element={<Study />}
            loader={() => {
              const { studentDictionaries } = store.getState();

              if (studentDictionaries.selectedDictionary === undefined) {
                return false;
              }

              store.dispatch(
                fetchAvailableWords(
                  studentDictionaries.selectedDictionary.dictionaryid
                )
              );
              return true;
            }}
          />

          <Route path={`${route.studyTypes}`} element={<StudyTypes />} />
        </Route>

        <Route path={`${route.studentInfo}`} element={<StudentInfo />} />
        <Route
          path={`${route.foreignTranslation}`}
          element={<ForeignTranslation />}
        />
      </Route>
      <Route path={`${route.login}`} element={<Login />} />
      <Route path={`${route.register}`} element={<Register />} />
      <Route path="*" element={<Error errorText="Stranica ne postoji." />} />
    </>
  )
);

export default appRouter;
