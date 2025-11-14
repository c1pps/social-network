import Navbar from './components/Navbar';
import LoginPage from './pages/LogInPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignInPage from './pages/SignInPage'
import PostDetails from './pages/PostDetails'
import ProtectedRoute from './components/ProtectedRoute';
import {AuthProvider} from './providers/AuthProvider';

export default function App() {
  return (
    <div>
    
      <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
            <Route path='/post/:id' element={<ProtectedRoute><PostDetails /></ProtectedRoute>}></Route>
          <Route path='/' element={<Home />}/>
          <Route path='/signin' element={<SignInPage />}/>
          <Route path='/login' element={<LoginPage />}></Route>
        </Routes>
         </AuthProvider>
      </BrowserRouter>
   
    </div>
  );
}
