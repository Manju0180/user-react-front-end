import './App.css';
import Navbar from './components/Navbar';
import UserTable from './components/UserTable';


function App() {
  return (
    <div className='user-app'>
      <Navbar/>
      <UserTable/>
    </div>
  );
}
export default App;
