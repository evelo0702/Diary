import React, { useReducer, useRef } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

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
export const DiaryDispatchContext = React.createContext();

const dummyData = [
  {
    id: 1,
    emotion: 1,
    content: "오늘의 일기 1번",
    weather: "sunny",
    date: 1684143297668,
  },
  {
    id: 2,
    emotion: 3,
    content: "오늘의 일기 2번",
    weather: "strom",
    date: 1684143297669,
  },
  {
    id: 3,
    emotion: 2,
    content: "오늘의 일기 3번",
    weather: "snow",
    date: 1684143297671,
  },
  {
    id: 4,
    emotion: 4,
    content: "오늘의 일기 4번",
    weather: "rain",
    date: 1684143297673,
  },
  {
    id: 5,
    emotion: 5,
    content: "오늘의 일기 5번",
    weather: "cloudy",
    date: 1684143297675,
  },
];

function App() {
  // 기본경로설정
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";
  const [data, dispatch] = useReducer(reducer, dummyData);
  const dataId = useRef(0);
  // CREATE
  const onCreate = (date, content, emotion, weather) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
        weather,
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
  const onEdit = (targetId, date, content, emotion, weather) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
        weather,
      },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/New" element={<New />}></Route>
              <Route path="/Edit" element={<Edit />}></Route>
              <Route path="/Diary/:id" element={<Diary />}></Route>
              {/* <Route path="/Diary/" element={<Diary />}></Route> */}
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
