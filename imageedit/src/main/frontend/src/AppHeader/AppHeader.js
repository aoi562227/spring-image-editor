import React, { useEffect, useRef, useState } from "react";
import AddMemberForm from "./AddMemberForm";
import LoginForm from "./LoginForm";

const AppHeader = (props) => {
  const fileUploadInput = useRef(null);

  const [addMemberIsOpen, setAddMemberIsOpen] = useState(false); // 회원가입 창의 초기 표시 유무 false
  const [loginIsOpen, setLoginIsOpen] = useState(false); // 로그인 창의 초기 표시 유무 false
  const [userLoginState, setUserLoginState] = useState(false); // 로그인 유무 초기 상태 false
  const [userName, setUserName] = useState(""); // 유저 이름 초기 상태 빈 문자열

  // 회원가입 창 열기
  const openAddMember = () => {
    setAddMemberIsOpen(true);
  };
  // 회원가입 창 닫기
  const closeAddMember = () => {
    setAddMemberIsOpen(false);
  };
  // 로그인 창 열기
  const openLogin = () => {
    setLoginIsOpen(true);
  };
  // 로그인 창 닫기
  const closeLogin = () => {
    setLoginIsOpen(false);
  };
  // 로그아웃 기능
  const logout = () => {
    setUserLoginState(false);
    // 로그인 컴포넌트의 내용값 바꾸기
    //window.location.reload();
  };

  const { myImageEditor } = props;

  // 프로젝트 저장. 미구현
  const onClickUploadProject = () => {
    myImageEditor.current.imageEditorInst.ui.eventHandler.upload();
  };

  // 프로젝트 불러오기. 미구현
  const onClickLoadProject = (e) => {};

  // 업로드
  const onClickLoad = (e) => {
    const file = e.target.files[0];

    if (file) {
      myImageEditor.current.imageEditorInst.ui.eventHandler.loadImage(e);
    }
  };

  // 다운로드
  const onClickDownload = (e) => {
    myImageEditor.current.imageEditorInst.ui.eventHandler.download();
  };

  // 자식 컴포넌트(LoginForm)으로부터 userData 받아오기
  const getUserData = (name, loginState) => {
    setUserName(name);
    setUserLoginState(loginState);
  };
  useEffect(() => {
    console.log(userLoginState);
  }, [userLoginState]);

  return (
    <div className="AppHeader">
      <div className="title">
        <img src="./img/titleLogo.png" alt="logo" />
      </div>
      <div className="headerButtons">
        {!userLoginState && ( // 회원가입과 로그인. 로그인 상태가 아니면 표시
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
        {userLoginState && ( // 로그아웃과 로그인 환영 메시지. 로그인 상태라면 표시
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
            fileUploadInput.current.click(); // 버튼 클릭시 file타입 input태그가 클릭되도록
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
