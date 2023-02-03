import { Route, Routes } from 'react-router-dom'
import './App.css';
import List from './components/list'
import 'bootstrap/dist/css/bootstrap.min.css';
import Welcome from './components/welcome';

function App() {
  return (
    <div className="">
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/pokemon-list' element={<List />} />
      </Routes>
    </div>
  );
}

export default App;
