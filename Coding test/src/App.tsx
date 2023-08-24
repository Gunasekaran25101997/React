import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import View from './View';
function App() {

  return (
  <>
      <BrowserRouter>
      <Routes>
        <Route path="" element={<View />}>
          {/* <Route index path='xcvxcvxcv' element={<View />} /> */}
          {/* <Route path="" element={<View />} /> */}
        </Route>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
