import { Route, Routes, BrowserRouter } from 'react-router-dom'
import './App.css';
import List from './components/list'
import 'bootstrap/dist/css/bootstrap.min.css';
import Welcome from './components/welcome';

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='/pokemon-list' element={<List />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
