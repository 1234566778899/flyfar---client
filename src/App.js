import { Route, Routes } from 'react-router-dom';
import './App.css';
import { LoginApp } from './components/LoginApp';
import { RegisterApp } from './components/RegisterApp';
import { AuthProvider, useFirebaseApp } from 'reactfire';
import { AuthContextApp } from './contexts/AuthContextApp';
import { getAuth } from 'firebase/auth';
import { DashboardApp } from './components/DashboardApp';
import { RoomApp } from './components/RoomApp';
import { GameApp } from './components/GameApp';
import { ResumeApp } from './components/ResumeApp';
import { MainContextApp } from './contexts/MainContextApp';
import { NotFoundApp } from './components/NotFoundApp';
import { AdminApp } from './components/AdminApp';

function App() {
  const firestoreInstance = getAuth(useFirebaseApp());
  return (
    <>
      <AuthProvider sdk={firestoreInstance}>
        <AuthContextApp>
          <Routes>
            <Route exact path='/' element={<LoginApp />} />
            <Route exact path='/login' element={<LoginApp />} />
            <Route exact path='/register' element={<RegisterApp />} />
            <Route path='/admin/*' element={<AdminRoutes />} />
            <Route path='*' element={<NotFoundApp />} />
          </Routes>
        </AuthContextApp>
      </AuthProvider>
    </>
  );
}
const AdminRoutes = () => (
  <MainContextApp>
    <Routes>
      <Route path='' element={<AdminApp />}>
        <Route exact path='/dashboard' element={<DashboardApp />} />
        <Route exact path='/room' element={<RoomApp />} />
        <Route exact path='/game' element={<GameApp />} />
        <Route exact path='/resume' element={<ResumeApp />} />
      </Route>
    </Routes>
  </MainContextApp>
);
export default App;
