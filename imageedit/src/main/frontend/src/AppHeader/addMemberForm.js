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
  const [userInfo, changeUserInfo] = useReducer(reducer, {
    userEmail: "",
    userPassword: "",
    userName: "",
  });
  const { userEmail, userPassword, userName } = userInfo; // user 정보 데이터

  const checkEmail = (e) => {
    var regExp =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    regExp.test(e.target.value)
      ? setEmailError(false) // 오류가 없다는 것
      : setEmailError(true);
  };
  const checkPassword = (e) => {
    //  8 ~ 16자 영문, 숫자 조합
    var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;
    regExp.test(e.target.value)
      ? setPasswordError(false) // 오류가 없다는 것
      : setPasswordError(true);
  };
  const checkName = (e) => {
    e.target.value !== "" && JSON.stringify(e.target.value).length <= 10
      ? setNameError(false) // 오류가 없다는 것
      : setNameError(true);
  };

  const onChange = (e) => {
    changeUserInfo(e.target);
  };

  const onClickSubmit = async (e) => {
    if (emailError || passwordError || nameError) {
      alert("입력한 값들을 다시 확인해주세요!");
      e.preventDefault();
    } else {
      await axios
        .post("/signUp", {
          loginId: userEmail,
          password: userPassword,
          name: userName,
        })
        .then((response) => {
          // 가입 처리 부분. 성공했는지 true false 리턴이 필요할 것 같습니다.
          console.log(response.data);
          if (response.data)
            // 성공했다면
            changeUserInfo({ userEmail: "", userPassword: "", userName: "" });
          else alert("입력한 값들을 다시 확인해주세요!"); // 실패했다면
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
          {emailError && (
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
          {passwordError && (
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
          {nameError && <div className="err">10자 이하로 입력해주세요!</div>}
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

/*
export default function AddMemberForm() {
  const [msg, setMsg] = useState([]);

  useEffect(() => {
    fetch("/add")
      .then((response) => {
        return response.text();
      })
      .then((html) => {
        setMsg(html);
      });
  }, []);

  const iframePart = () => {
    return {
      __html: msg,
    };
  };
  return <div dangerouslySetInnerHTML={iframePart()} />;
}
*/
