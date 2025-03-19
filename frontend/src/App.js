import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeRoute from './routes/HomeRoute';
import HowPlayRoute from './routes/HowPlayRoute';
import PlayQuizRoute from './routes/PlayQuizRoute';
import Winner from './components/Quiz/Winner';
import Loss from './components/Quiz/Loss';
import Result from './components/Result';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomeRoute />}/>
      <Route path="/How" element={<HowPlayRoute />}/>
      <Route path="/Play" element={<PlayQuizRoute />}/>
      <Route path='/result' element={<Result />} />
      <Route path="/winner" element={<Winner/>}/>
      <Route path="/looser" element={<Loss/>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
