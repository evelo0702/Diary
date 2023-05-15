import { useParams } from "react-router-dom";
const Diary = () => {
  const { id } = useParams(); // path의 변수명과 동일해야함
  console.log(id);
  return (
    <div>
      <h1>Diary</h1>
      <p>이곳은 Diary입니다</p>
    </div>
  );
};

export default Diary;
