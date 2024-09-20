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
import { ChallengesApp } from './components/ChallengesApp';
import { ProgressApp } from './components/ProgressApp';
import { SubmissionApp } from './components/SubmissionApp';
import { ProfileApp } from './components/ProfileApp';

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
            <Route path='*' element={<NotFoundApp />} />
            <Route path='/admin/*' element={<AdminRoutes />} />

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
        <Route exact path='/profile' element={<ProfileApp />} />
        <Route exact path='/progress/:id' element={<ProgressApp />} />
        <Route exact path='/game/:id/:index' element={<GameApp />} />
        <Route exact path='/resume/:id' element={<ResumeApp />} />
        <Route exact path='/challenges/:id' element={<ChallengesApp />} />
        <Route exact path='/submissions' element={<SubmissionApp />} />
        <Route exact path='/submissions/:id' element={<SubmissionApp />} />
        <Route path='*' element={<NotFoundApp />} />
      </Route>
    </Routes>
  </MainContextApp>
);
export default App;
