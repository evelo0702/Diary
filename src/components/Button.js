const Button = ({ text, type, onClick }) => {
  // 기본버튼 조건 설정
  const btnType = ["positive", "negative"].includes(type) ? type : "default";

  return (
    <button
      className={["Button", `Button_${btnType}`].join(" ")}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

Button.defaultProps = {
  type: "default",
};
export default Button;
