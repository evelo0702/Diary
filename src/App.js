import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";
function App() {
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";

  return (
    <BrowserRouter>
      <div className="App">
        <h2>App.js</h2>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/New" element={<New />}></Route>
          <Route path="/Edit" element={<Edit />}></Route>
          <Route path="/Diary/:id" element={<Diary />}></Route>
          {/* <Route path="/Diary/" element={<Diary />}></Route> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
