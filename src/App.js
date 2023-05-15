import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

// Components
import Button from "./components/Button";
import Header from "./components/Header";

function App() {
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";

  return (
    <BrowserRouter>
      <div className="App">
        <Header
          headText={"App"}
          leftchild={
            <Button
              text={"왼쪽버튼"}
              onClick={() => {
                alert("왼쪽 클릭");
              }}
            />
          }
          rightchild={
            <Button
              text={"오른쪽버튼"}
              onClick={() => {
                alert("오른쪽 클릭");
              }}
            />
          }
        />
        <h2>App.js</h2>
        <Button
          text={"버튼"}
          onClick={() => alert("버튼클릭")}
          type={"positive"}
        />
        <Button
          text={"버튼"}
          onClick={() => alert("버튼클릭")}
          type={"negative"}
        />
        <Button text={"버튼"} onClick={() => alert("버튼클릭")} />

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
