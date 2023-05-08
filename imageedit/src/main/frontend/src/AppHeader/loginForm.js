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
  const [userName, setUserName] = useState();
  const [userInfo, changeUserInfo] = useReducer(reducer, {
    userEmail: "",
    userPassword: "",
  });
  const { userEmail, userPassword } = userInfo;
  const { returnUserData } = props;

  const onChange = (e) => {
    changeUserInfo(e.target);
  };
  const onClickSubmit = async (e) => {
    if (!userEmail || !userPassword) {
      alert("입력한 값들을 다시 확인해주세요!");
      e.preventDefault();
    } else {
      await axios
        .post("/login", {
          loginId: userEmail,
          password: userPassword,
        })
        .then((response) => {
          // 로그인 처리 부분. 이쪽도 성공했는지 true false 리턴이 필요할 것 같습니다
          console.log(response.data);
          if (response.data) {
            // 성공했다면
            setUserName(response.data.name); // 이름 설정을 위해서 name 데이터가 필요
            returnUserData(userName, true); // 부모 컴포넌트로 userName과 로그인 상태 전달
            changeUserInfo({ userEmail: "", userPassword: "" });
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
