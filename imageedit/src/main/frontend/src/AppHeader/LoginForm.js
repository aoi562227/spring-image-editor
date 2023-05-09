import React, { useReducer, useState } from "react";
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
  const [userName, setUserName] = useState(""); // 유저 이름 초기 상태 빈 문자열

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
    // 하나라도 유효성 체크를 통과 못한다면
    if (!userEmail || !userPassword) {
      alert("입력한 값들을 다시 확인해주세요!");
      e.preventDefault(); // 로그인 창을 닫지 않음
    } else {
      await axios
        .post("/login", {
          // /login 주소로 데이터 전달
          loginId: userEmail,
          password: userPassword,
        })
        .then((response) => {
          // 로그인 처리 부분. 이쪽도 성공했는지 true false 리턴이 필요할 것 같습니다
          console.log(response.data); // 받아온 데이터를 콘솔에 출력
          if (response.data) {
            // 성공했다면
            setUserName(response.data.name); // 이름 설정을 위해서 name 데이터가 필요
            returnUserData(userName, true); // 부모 컴포넌트(AppHeader)로 userName과 로그인 상태 전달
            document.getElementById(userEmail).value = null; // 사용자가 input태그에 입력했던 값 초기화
            document.getElementById(userPassword).value = null;
          } else alert("입력한 값들을 다시 확인해주세요!"); // 실패했다면
        })
        .catch((error) => {
          // 에러메시지 출력
          console.log(error);
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
