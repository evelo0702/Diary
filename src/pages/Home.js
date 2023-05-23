import { useContext, useEffect, useState } from "react";
import Header from "./../components/Header";
import Button from "./../components/Button";
import { DiaryStateContext } from "../App";
import DiaryList from "./../components/DiaryList";
const Home = () => {
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정 일기장 `; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [curDate, setCurDate] = useState(new Date());
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;
  const increaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    );
  };
  const decreaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    );
  };
  const diaryList = useContext(DiaryStateContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (diaryList.length >= 1) {
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();
      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0,
        23,
        59,
        59
        // 31일을 포함시키기위한 설정
      ).getTime();
      setData(
        diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay)
      );
    }
  }, [diaryList, curDate]);

  return (
    <div>
      <Header
        headText={headText}
        leftchild={
          <Button
            text={"<"}
            onClick={() => {
              decreaseMonth();
            }}
          />
        }
        rightchild={
          <Button
            text={">"}
            onClick={() => {
              increaseMonth();
            }}
          />
        }
      />
      <DiaryList diaryList={data} />
    </div>
  );
};

export default Home;
