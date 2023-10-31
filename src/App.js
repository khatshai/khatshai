import { Routes,Route } from 'react-router-dom';
import './App.css';
import Header from './components/mainRMheader/Header';
import DashboardComp from './components/dashboard/DashboardComp';

function App() {
  return (
    <>
    {/* <Routes>
      <Route path="/*" element={<DashboardComponent/>}/>
    </Routes> */}
    <Header/>
    <Routes>
      <Route path="/*" element={<DashboardComp />}/>
    </Routes>
    </>
  );
}

export default App;
