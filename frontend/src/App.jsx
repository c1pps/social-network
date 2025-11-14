import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import {AuthProvider} from './providers/AuthProvider';
import { Suspense, lazy } from 'react';
import Loader from './components/Loader';

const Home = lazy(() => import('./pages/Home'));
const SignInPage = lazy(() => import('./pages/SignInPage'));
const LoginPage = lazy(() => import('./pages/LogInPage'));
const PostDetails = lazy(() => import('./pages/PostDetails'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));

export default function App() {
  return (
    <div>

      <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Suspense fallback={<div>{Loader}</div>}>
          <Routes>
            <Route path='/post/:id' element={<ProtectedRoute><PostDetails /></ProtectedRoute>}></Route>
            <Route path='/' element={<Home />}/>
            <Route path='/signin' element={<SignInPage />}/>
            <Route path='/login' element={<LoginPage />}></Route>
            <Route path='/profile' element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}></Route>
          </Routes>
        </Suspense>
         </AuthProvider>
      </BrowserRouter>
   
    </div>
  );
}
