import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";

Modal.setAppElement("#root");

export default function ChatGPTForm(props) {

  const [userSearch, setUserSearch] = useState("");

  // input태그의 value값 변화시 서버로의 데이터 전달에 사용할 userInfo 값 변경
  const onChange = (e) => {
    setUserSearch(e.target.value);
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
      isOpen={props.useChatGPTIsOpen}
      onRequestClose={props.closeUseChatGPT}
    >
      <div className="container">
        <form className="form">
          <h1
            style={{
              marginBottom: "4rem",
            }}
          >
          ChatGPT
          </h1>
          <textarea rows={10} cols={50} readonly={true}>

          </textarea>
          <input
            className="input"
            name="userSearch"
            value={userSearch}
            onChange={onChange}
            placeholder="검색"
          />
          <button className="btn" onClick={onClickSubmit}>
            검색
          </button>
        </form>
      </div>
    </Modal>
  );
}