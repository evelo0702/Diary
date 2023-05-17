const EmotionItem = ({
  emotion_id,
  emotion_img,
  emotion_des,
  clickEvent,
  isSelected,
}) => {
  return (
    <div>
      <div
        onClick={() => clickEvent(emotion_id)}
        className={[
          "EmotionItem",
          isSelected ? `EmotionItem_on_${emotion_id}` : `EmotionItem_off`,
        ].join(" ")}
      >
        <img src={emotion_img} />
        <span>{emotion_des}</span>
      </div>
    </div>
  );
};
export default EmotionItem;
