import { useNavigate, useSearchParams } from "react-router-dom";

const Edit = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");

  console.log(`id : ${id}`);
  const mode = searchParams.get("mode");
  console.log(`mode : ${mode}`);

  const navigate = useNavigate();

  return (
    <div>
      <h1>Edit</h1>
      <p>이곳은 Edit입니다</p>
      <button onClick={() => setSearchParams({ who: "evelo" })}>
        QS바꾸기
      </button>
      <button
        onClick={() => {
          navigate("/home");
        }}
      >
        Home으로 이동
      </button>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        뒤로가기
      </button>
    </div>
  );
};

export default Edit;
