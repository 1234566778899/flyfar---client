import { Route, Routes } from 'react-router-dom';
import './App.css';
import { LoginApp } from './components/LoginApp';
import { RegisterApp } from './components/RegisterApp';
import { AuthProvider, useFirebaseApp } from 'reactfire';
import { AuthContextApp } from './contexts/AuthContextApp';
import { getAuth } from 'firebase/auth';

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
          </Routes>
        </AuthContextApp>
      </AuthProvider>
    </>
  );
}

export default App;
