import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddMemberForm from "./AddMemberForm";
import LoginForm from "./LoginForm";

const AppHeader = (props) => {
  const fileUploadInput = useRef(null);
  const navigate = useNavigate();
  /*
  const goUrlSignUp = () => {
    navigate("/signUp");
  };
  const goUrlLogin = () => {
    navigate("/login");
  };
  */
  const [addMemberIsOpen, setAddMemberIsOpen] = useState(false);
  const [loginIsOpen, setLoginIsOpen] = useState(false);
  const [userLoginState, setUserLoginState] = useState(false);
  const [userName, setUserName] = useState("");

  const openAddMember = () => {
    setAddMemberIsOpen(true);
  };
  const closeAddMember = () => {
    console.log("clicked");
    setAddMemberIsOpen(false);
  };
  const openLogin = () => {
    setLoginIsOpen(true);
  };
  const closeLogin = () => {
    console.log("clicked");
    setLoginIsOpen(false);
  };
  const logout = () => {
    setUserLoginState(false);
    // 로그인 컴포넌트의 내용값 바꾸기
    window.location.reload();
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

  const getUserData = (name, loginState) => {
    setUserName(name);
    setUserLoginState(loginState);
  };

  return (
    <div className="AppHeader">
      <div className="title">
        <img src="./img/titleLogo.png" alt="logo" />
      </div>
      <div className="headerButtons">
        {!userLoginState && ( // 회원가입과 로그인
          <>
            <button className="signUpBtn" onClick={openAddMember}>
              회원가입
            </button>
            <AddMemberForm
              addMemberIsOpen={addMemberIsOpen}
              closeAddMember={closeAddMember}
            ></AddMemberForm>
            <button className="loginBtn" onClick={openLogin}>
              로그인
            </button>
            <LoginForm
              loginIsOpen={loginIsOpen}
              closeLogin={closeLogin}
              returnUserData={getUserData}
            ></LoginForm>
          </>
        )}
        {userLoginState && ( // 로그아웃과 로그인 환영 메시지
          <>
            <div className="loginMsg">{userName}님, 환영합니다!</div>
            <button className="logoutBtn" onClick={logout}>
              로그아웃
            </button>
          </>
        )}
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
