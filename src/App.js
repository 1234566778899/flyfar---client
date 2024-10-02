import { Route, Routes } from 'react-router-dom';
import './App.css';
import { LoginApp } from './components/auth/LoginApp';
import { RegisterApp } from './components/auth/RegisterApp';
import { AuthProvider, useFirebaseApp } from 'reactfire';
import { getAuth } from 'firebase/auth';
import { AuthContextApp } from './contexts/AuthContextApp';
import { RoomApp } from './components/game/RoomApp';
import { ProgressApp } from './components/game/ProgressApp';
import { GameApp } from './components/game/GameApp';
import { ResumeApp } from './components/game/ResumeApp';
import { InitialTestApp } from './components/game/InitialTestApp';
import { SubmissionApp } from './components/game/SubmissionApp';
import { NotFoundApp } from './components/NotFoundApp';
import { ChallengesApp } from './components/game/ChallengesApp';
import { TopUsersApp } from './components/TopUsersApp';
import { ProfileApp } from './components/ProfileApp';
import { ListFriendsApp } from './components/ListFriendsApp';
import { ProfileInfoApp } from './components/ProfileInfoApp';
import { AdminApp } from './components/AdminApp';
import { DashboardApp } from './components/DashboardApp';
import { MainContextApp } from './contexts/MainContextApp';
import { DetailsApp } from './components/game/DetailsApp';
import { TasksApp } from './components/game/TasksApp';
import { GameOneApp } from './components/game/GameOneApp';
import { SendsApp } from './components/game/SendsApp';
import { GameTestApp } from './components/game/GameTestApp';
import { SubmissionTestApp } from './components/game/SubmissionTestApp';


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
        <Route exact path='/friends' element={<ListFriendsApp />} />
        <Route exact path='/game/:id/:index' element={<GameApp />} />
        <Route exact path='/resume/:id' element={<ResumeApp />} />
        <Route exact path='/test/:id' element={<InitialTestApp />} />
        <Route exact path='/user/:email' element={<ProfileInfoApp />} />
        <Route exact path='/ranking' element={<TopUsersApp />} />
        <Route exact path='/challenges/:id' element={<ChallengesApp />} />
        <Route exact path='/tasks' element={<TasksApp />} />
        <Route exact path='/game/:taskId' element={<GameOneApp />} />
        <Route exact path='/game/test/:taskId' element={<GameTestApp />} />
        <Route exact path='/details/:id' element={<DetailsApp />} />
        <Route exact path='/sends/:taskId' element={<SendsApp />} />
        <Route exact path='/submissions/:challengeId' element={<SubmissionApp />} />
        <Route exact path='/submissions/test/:challengeId' element={<SubmissionTestApp />} />
        <Route exact path='/submissions/:challengeId/:taskId' element={<SubmissionApp />} />
        <Route path='*' element={<NotFoundApp />} />
      </Route>
    </Routes>
  </MainContextApp>
);
export default App;
