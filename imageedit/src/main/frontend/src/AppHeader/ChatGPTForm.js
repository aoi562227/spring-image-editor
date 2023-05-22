import React, { useState, useRef } from "react";
import Modal from "react-modal";
import axios from "axios";

Modal.setAppElement("#root");

export default function ChatGPTForm(props) {
  const resultTextarea = useRef(null);
  const [userSearch, setUserSearch] = useState("");
  // const APIKey = "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";
  const onChange = (e) => {
    setUserSearch(e.target.value);
  };
  // 서버로 데이터 전송
  const onClickSubmit = async (e) => {
    e.preventDefault(); // 창을 닫지 않음
    if (!userSearch) {
      alert("검색 입력 값을 다시 확인해주세요!");
    } else {
      resultTextarea.current.value = "로딩중..";
      await axios
        .post("/api/v1/chat", {
          // /api/v1/chat 주소로 데이터 전달
          question: userSearch,
        })
        .then((response) => {
          console.log(response.data); // 받아온 데이터 콘솔에 출력
          resultTextarea.current.value =
            response.data.choices[0].message.content; // 데이터를 텍스트 박스에 출력
        })
        .catch((error) => {
          // 에러메시지 콘솔 출력
          console.log(error);
          resultTextarea.current.value = error.message;
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
          <h1>ChatGPT</h1>
          <textarea
            ref={resultTextarea}
            rows={13}
            cols={60}
            style={{ fontFamily: "Noto Sans" }}
            readOnly
          >
            답변 창입니다.
          </textarea>
          <input
            className="input"
            name="userSearch"
            value={userSearch}
            onChange={onChange}
            placeholder="질문을 입력해주세요."
          />
          <button className="btn" onClick={onClickSubmit}>
            전송
          </button>
        </form>
      </div>
    </Modal>
  );
}
