import React, { useReducer } from "react";
import Modal from "react-modal";
import axios from "axios";

Modal.setAppElement("#root");
const reducer = (state, action) => {
  return {
    ...state,
    [action.name]: action.value,
  };
};
const LoginForm = (props) => {
  //const [userName, setUserName] = useState(""); // 유저 이름 초기 상태 빈 문자열

  // userInfo - user 정보 데이터 / changeUserInfo - userInfo 변경 함수
  const [userInfo, changeUserInfo] = useReducer(reducer, {
    userEmail: "",
    userPassword: "",
  });

  // user 정보 데이터
  const { userEmail, userPassword } = userInfo;

  // AppHeader에서 userData를 받기 위한 함수
  const { returnUserData } = props;

  // input태그의 value값 변화시 user 정보 데이터 값 변경
  const onChange = (e) => {
    changeUserInfo(e.target);
  };
  // 서버로 데이터 전송
  const onClickSubmit = async (e) => {
    e.preventDefault(); // 로그인 창을 닫지 않음
    if (!userEmail || !userPassword) {
      alert("입력한 값들을 다시 확인해주세요!");
    } else {
      await axios
        .post("/login", {
          // /login 주소로 데이터 전달
          loginId: userEmail,
          password: userPassword,
        })
        .then((response) => {
          // 성공했다면
          if (response.data.name !== null) {
            console.log(
              "login response data: " + JSON.stringify(response.data)
            );
            returnUserData(
              `${response.data.name}`,
              `${response.data.loginId}`,
              true
            ); // 부모 컴포넌트(AppHeader)로 name과 로그인 성공 전달
            // 기존에 input 태그에 입력했던 값들 제거
            for (const [key, value] of Object.entries({
              userEmail: "",
              userPassword: "",
            })) {
              document.getElementsByName(`${key}`)[0].value = null;
              changeUserInfo({ name: `${key}`, value: `${value}` });
            }
            props.closeLogin(); // 로그인 창 닫기
          } // 실패했다면
          else alert("로그인 정보가 일치하지 않습니다.\n다시 입력해주세요!");
        })
        .catch((error) => {
          alert("로그인 정보가 일치하지 않습니다.\n다시 입력해주세요!"); // 실패했다면
          // 에러메시지 콘솔 출력
          console.log(error); // 'Request failed with status code 500'
        });
    }
  };
  return (
    <Modal
      className="modal"
      isOpen={props.loginIsOpen}
      onRequestClose={props.closeLogin}
    >
      <div className="container">
        <form className="form">
          <h1
            style={{
              marginBottom: "4rem",
            }}
          >
            로그인
          </h1>
          <input
            className="input"
            name="userEmail"
            type="email"
            placeholder="Email"
            value={userEmail}
            onChange={onChange}
          />
          <input
            className="input"
            name="userPassword"
            type="password"
            placeholder="Password"
            value={userPassword}
            onChange={onChange}
          />
          <button className="btn" onClick={onClickSubmit}>
            로그인
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default LoginForm;
