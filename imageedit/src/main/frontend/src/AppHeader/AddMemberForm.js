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
const AddMemberForm = (props) => {
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [nameError, setNameError] = useState(false);

  // userInfo - user 정보 데이터 / changeUserInfo - userInfo 변경 함수
  const [userInfo, changeUserInfo] = useReducer(reducer, {
    userEmail: "",
    userPassword: "",
    userName: "",
  });

  // user 정보 데이터
  const { userEmail, userPassword, userName } = userInfo;

  // 이메일 유효성 체크
  const checkEmail = (e) => {
    var regExp =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    regExp.test(e.target.value)
      ? setEmailError(false) // 오류가 없다는 것
      : setEmailError(true);
  };

  // 패스워드 유효성 체크
  const checkPassword = (e) => {
    //  8 ~ 16자 영문, 숫자 조합
    var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;
    regExp.test(e.target.value)
      ? setPasswordError(false) // 오류가 없다는 것
      : setPasswordError(true);
  };

  // 이름 유효성 체크
  const checkName = (e) => {
    e.target.value !== "" && JSON.stringify(e.target.value).length <= 10
      ? setNameError(false) // 오류가 없다는 것
      : setNameError(true);
  };

  // input태그의 value값 변화시 서버로의 데이터 전달에 사용할 userInfo 값 변경
  const onChange = (e) => {
    changeUserInfo(e.target);
  };

  // 서버로 데이터 전송
  const onClickSubmit = async (e) => {
    e.preventDefault(); // 회원가입 창을 닫지 않음
    if (emailError || passwordError || nameError) {
      // 하나라도 유효성 체크를 통과 못한다면
      alert("입력한 값들을 다시 확인해주세요!");
    } else {
      await axios
        .post("/signUp", {
          // /signUp 주소로 데이터 전달
          loginId: userEmail,
          password: userPassword,
          name: userName,
        })
        .then((response) => {
          console.log(response.data); // 받아온 데이터 콘솔에 출력
          if (response.data === "성공") {
            // 성공했다면
            alert("회원가입 " + response.data); // "회원가입 성공"
            // 기존에 input 태그에 입력했던 값들 제거
            for (const [key, value] of Object.entries({
              userEmail: "",
              userPassword: "",
              userName: "",
            })) {
              document.getElementsByName(`${key}`)[0].value = null;
              changeUserInfo({ name: `${key}`, value: `${value}` });
            }
            props.closeAddMember(); // 회원가입 창 닫기
          } else alert(response.data); // 실패했다면. "이미 존재하는 회원입니다"
        })
        .catch((error) => {
          // 에러메시지 콘솔 출력
          console.log(error);
        });
    }
  };
  return (
    <Modal
      className="modal"
      isOpen={props.addMemberIsOpen}
      onRequestClose={props.closeAddMember}
    >
      <div className="container">
        <form className="form">
          <h1
            style={{
              marginBottom: "4rem",
            }}
          >
            회원가입
          </h1>
          {emailError && ( // 이메일 유효성 체크 에러 메시지
            <div className="err">이메일 형식을 다시 확인해주세요!</div>
          )}
          <input
            className="input"
            name="userEmail"
            type="email"
            placeholder="Email"
            value={userEmail}
            onChange={onChange}
            onBlur={checkEmail}
          />
          {passwordError && ( // 패스워드 유효성 체크 에러 메시지
            <div className="err">
              8 ~ 16자 영문, 숫자 조합으로 입력해주세요!
            </div>
          )}
          <input
            className="input"
            name="userPassword"
            type="password"
            placeholder="Password"
            value={userPassword}
            onChange={onChange}
            onBlur={checkPassword}
          />
          {nameError && ( // 이름 유효성 체크 에러 메시지
            <div className="err">10자 이하로 입력해주세요!</div>
          )}
          <input
            className="input"
            name="userName"
            type="text"
            placeholder="Name"
            value={userName}
            onChange={onChange}
            onBlur={checkName}
          />
          <button className="btn" onClick={onClickSubmit}>
            회원가입
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default AddMemberForm;
