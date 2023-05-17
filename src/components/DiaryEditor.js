import { useNavigate } from "react-router-dom";
import { useState, useRef, useContext } from "react";
import Header from "./Header";
import Button from "./Button";
import EmotionItem from "./EmotionItem";
import { DiaryDispatchContext } from "./../App.js";
const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
    emotion_des: "매우 좋음",
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
    emotion_des: "좋음",
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
    emotion_des: "보통",
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
    emotion_des: "나쁨",
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
    emotion_des: "매우 나쁨",
  },
];
const getDate = (date) => {
  return date.toISOString().slice(0, 10);
};

const DiaryEditor = () => {
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState(getDate(new Date()));
  const contentRef = useRef();
  const [content, setContent] = useState("");
  const { onCreate } = useContext(DiaryDispatchContext);
  const navigate = useNavigate();
  const ClickEmote = (emotion) => {
    setEmotion(emotion);
  };
  const submit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }
    onCreate(date, content, emotion);
    navigate("/", { replace: true });
  };
  return (
    <div className="DiaryEditor">
      <Header
        headText={"새 일기 쓰기"}
        leftchild={<Button text={"뒤로가기"} onClick={() => navigate(-1)} />}
      />

      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box"></div>
          <input
            className="input_date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((it) => (
              <EmotionItem
                key={it.emotion_id}
                {...it}
                clickEvent={ClickEmote}
                isSelected={it.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box text_wrapper">
            <textarea
              placeholder="오늘은 어땠나요?"
              ref={contentRef}
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
          </div>
        </section>
        <section>
          <div className="control_box">
            <Button text={"취소하기"} onClick={() => navigate(-1)} />
            <Button
              text={"작성완료"}
              type={"positive"}
              onClick={() => {
                submit();
              }}
            />
          </div>
        </section>
      </div>
    </div>
  );
};
export default DiaryEditor;
