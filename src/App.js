import React, { useReducer, useRef } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

// Components
import Button from "./components/Button";
import Header from "./components/Header";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }
  return newState;
};
// context
export const DiaryStateContext = React.createContext();
export const DiaryDispatchContenxt = React.createContext();

function App() {
  // 기본경로설정
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";

  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);
  // CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };
  // REMOVE
  const onRemove = (targetId) => {
    dispatch({
      type: "REMOVE",
      targetId,
    });
  };
  // EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContenxt.Provider value={{ onCreate, onEdit, onRemove }}>
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
            ></Header>

            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/New" element={<New />}></Route>
              <Route path="/Edit" element={<Edit />}></Route>
              <Route path="/Diary/:id" element={<Diary />}></Route>
              {/* <Route path="/Diary/" element={<Diary />}></Route> */}
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContenxt.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
