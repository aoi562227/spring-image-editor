import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const AppHeader = (props) => {
  const fileUploadInput = useRef(null);
  const navigate = useNavigate();

  const goUrlSignUp = () => {
    navigate("/signUp");
  };
  const goUrlLogin = () => {
    navigate("/login");
  };

  const { myImageEditor } = props;

  const onClickUploadProject = () => {
    myImageEditor.current.imageEditorInst.ui.eventHandler.upload();
  };

  const onClickLoadProject = (e) => {};

  const onClickLoad = (e) => {
    const file = e.target.files[0];

    if (file) {
      myImageEditor.current.imageEditorInst.ui.eventHandler.loadImage(e);
    }
  };

  const onClickDownload = (e) => {
    myImageEditor.current.imageEditorInst.ui.eventHandler.download();
  };

  return (
    <div className="AppHeader">
      <div className="title">
        <img src="./img/titleLogo.png" alt="logo" />
      </div>
      <div className="headerButtons">
        <button className="signUpBtn" onClick={goUrlSignUp}>
          회원가입
        </button>
        <button className="loginBtn" onClick={goUrlLogin}>
          로그인
        </button>
        <button className="projectLoadBtn" onClick={onClickLoadProject}>
          프로젝트 가져오기
        </button>
        <button className="projectSaveBtn" onClick={onClickUploadProject}>
          프로젝트 저장
        </button>
        <button
          className="loadBtn"
          onClick={() => {
            fileUploadInput.current.click();
          }}
        >
          업로드
          <input
            type="file"
            ref={fileUploadInput}
            accept="image/jpeg, image/png"
            onChange={onClickLoad}
            style={{ display: "None" }}
          />
        </button>
        <button className="downloadBtn" onClick={onClickDownload}>
          다운로드
        </button>
      </div>
    </div>
  );
};

export default AppHeader;
