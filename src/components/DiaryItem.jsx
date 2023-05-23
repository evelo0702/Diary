import Button from "./Button";
import { useNavigate } from "react-router-dom";

const DiaryItem = ({ id, emotion, date, content, title }) => {
  const navigate = useNavigate();
  const strDate = new Date(parseInt(date)).toLocaleDateString();

  const goDetail = () => {
    navigate(`/diary/${id}`);
  };
  const goEdit = () => {
    navigate(`/edit/${id}`);
  };
  return (
    <div className="DiaryItem">
      <div
        onClick={goDetail}
        className={[
          "emotion_img_wrapper",
          `emotion_img_wrapper_${emotion}`,
        ].join(" ")}
      >
        <img
          alt="감정"
          src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`}
        ></img>
      </div>

      <div onClick={goDetail} className="info_wrapper">
        <div className="diary_date">{strDate}</div>
        <div className="diary_content_preview">{title}</div>
      </div>
      <div className="btn_wrapper">
        <Button onClick={goEdit} text={"수정하기"} />
      </div>
    </div>
  );
};
export default DiaryItem;
