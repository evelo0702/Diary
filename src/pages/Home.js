import { useContext, useEffect, useState } from "react";
import Header from "./../components/Header";
import Button from "./../components/Button";
import { DiaryStateContext } from "../App";
import DiaryList from "./../components/DiaryList";
const Home = () => {
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
        0
      ).getTime();
      setData(
        diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay)
      );
    }
  }, [diaryList, curDate]);
  useEffect(() => {
    console.log(data);
  }, [data]);

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
