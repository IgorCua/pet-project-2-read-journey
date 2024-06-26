import './assets/fonts/poppins/poppinsFont.css';
import './assets/fonts/gilroy/gilroyFont.css';
import { Navigate, Route, Routes } from 'react-router-dom';
// import logo from './logo.svg';
import { Header } from './apps/header/Header';
import { PrivateRoute, PublicRoute } from './services/routes';
import { RegisterPage } from './apps/registerPage/RegisterPage';
import { LoginPage } from './apps/loginPage/LoginPage';
import { RecommendedPage } from './apps/recommendedPage/RecommendedPage';
import { selectAuthIsLoggedIn } from './redux/auth/selectors';
import { useSelector } from 'react-redux';
import { UserLibraryPage } from './apps/UserlibraryPage/UserLibraryPage';
import { Authenticate } from './components/authenticate/Authenticate';
import { ReadingPage } from './apps/readingPage/ReadingPage';

function App() {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);

  return (
      <Authenticate>
          <Routes>
              <Route path='/register' element={<PublicRoute component={<RegisterPage />} />} />
              <Route path='/login' element={<PublicRoute component={<LoginPage />} />} />
              {isLoggedIn &&
                  <Route element={<PrivateRoute component={<Header />} />}>
                      <Route path='/recommended' element={<PrivateRoute component={<RecommendedPage />} />} />
                      <Route path='/library' element={<PrivateRoute component={<UserLibraryPage />} />} />
                      <Route path='/reading' element={<PrivateRoute component={<ReadingPage />} />} />
                  </Route>
              }
              <Route path='*' element={<Navigate
                  to={isLoggedIn ? '/recommended' : '/register'}
                  replace={true} />
              } />
          </Routes>
      </Authenticate>
  );
}

export default App;
