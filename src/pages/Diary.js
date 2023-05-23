import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
import { getDate } from "../util/date";
import { emotionList } from "../util/emotion";
import Header from "../components/Header";
import Button from "../components/Button";
const Diary = () => {
  const { id } = useParams(); // path의 변수명과 동일해야함
  const diaryList = useContext(DiaryStateContext);
  const navigate = useNavigate();
  const [data, setData] = useState();
  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );
      if (targetDiary) {
        setData(targetDiary);
      } else {
        alert("없는 일기 입니다.");
        navigate("/", { replace: true });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, diaryList]);
  if (!data) {
    return <div className="DiaryPage">로딩중입니다</div>;
  } else {
    const curEmotionData = emotionList.find(
      (it) => parseInt(it.emotion_id) === data.emotion
    );
    return (
      <div className="DiaryPage">
        <Header
          headText={`${getDate(new Date(data.date))} 기록`}
          leftchild={<Button text={"뒤로가기"} onClick={() => navigate(-1)} />}
          rightchild={
            <Button
              text={"수정하기"}
              onClick={() => navigate(`/edit/${data.id}`)}
            />
          }
        />
        <article>
          <section>
            <h4>오늘의 일기</h4>
            <div
              className={[
                "diary_img_wrapper",
                `diary_img_wrapper_${data.emotion}`,
              ].join(" ")}
            >
              <img src={curEmotionData.emotion_img} alt="감정이미지" />
              <div className="emotion_des">{curEmotionData.emotion_des}</div>
            </div>

            <div className="diary_title_wrapper">
              <p>{data.title}</p>
            </div>
            <div className="diary_content_wrapper">
              <p>{data.content}</p>{" "}
            </div>
          </section>
        </article>
      </div>
    );
  }
};

export default Diary;
