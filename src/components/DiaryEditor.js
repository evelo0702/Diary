import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useContext, useCallback } from "react";
import Header from "./Header";
import Button from "./Button";
import EmotionItem from "./EmotionItem.js";
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

const DiaryEditor = ({ isEdit, originData }) => {
  const [title, setTitle] = useState("");
  const [inputCount, setInputCount] = useState(0);
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState(getDate(new Date()));
  const contentRef = useRef();
  const [content, setContent] = useState("");
  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);
  const navigate = useNavigate();
  const ClickEmote = useCallback((emotion) => {
    setEmotion(emotion);
  }, []);
  const submit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }
    if (
      window.confirm(
        isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 저장하시겠습니까?"
      )
    ) {
      if (isEdit) {
        onEdit(originData.id, date, content, emotion, title);
      } else {
        onCreate(date, content, emotion, title);
      }
      navigate("/", { replace: true });
    }
  };
  const remove = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      onRemove(originData.id);
      navigate("/", { replace: true });
    }
  };
  useEffect(() => {
    if (isEdit) {
      setDate(getDate(new Date()));
      setEmotion(originData.emotion);
      setContent(originData.content);
      setTitle(originData.title);
    }
  }, [isEdit, originData]);

  const onInputHandler = (e) => {
    setInputCount(e.target.value.length);
  };
  return (
    <div className="DiaryEditor">
      <Header
        headText={isEdit ? "일기 수정" : "새 일기 쓰기"}
        leftchild={<Button text={"뒤로가기"} onClick={() => navigate(-1)} />}
        rightchild={
          isEdit && (
            <Button text={"삭제하기"} type={"negative"} onClick={remove} />
          )
        }
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
          <h4>일기 제목</h4>
          <div className="input_box title_wrapper">
            <input
              maxLength={20}
              value={title}
              onChange={(e) => {
                onInputHandler(e);
                setTitle(e.target.value);
              }}
              placeholder="제목을 20자 이내로 작성해주세요"
            ></input>
            <div className="input_count">{inputCount}/20</div>
          </div>
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
              className="textarea"
              placeholder="오늘하루는 어땠나요?"
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
