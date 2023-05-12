import React, { useEffect, useRef, useState } from "react";
import AddMemberForm from "./AddMemberForm";
import LoginForm from "./LoginForm";
import LoadProjectForm from "./LoadProjectForm";

const AppHeader = (props) => {
  const fileUploadInput = useRef(null);

  const [addMemberIsOpen, setAddMemberIsOpen] = useState(false); // 회원가입 창의 초기 표시 유무 false
  const [loginIsOpen, setLoginIsOpen] = useState(false); // 로그인 창의 초기 표시 유무 false
  const [loadProjectIsOpen, setLoadProjectIsOpen] = useState(false); // 프로젝트 불러오기 창의 초기 표시 유무 false
  const [userLoginState, setUserLoginState] = useState(false); // 로그인 유무 초기 상태 false
  const [userName, setUserName] = useState(null); // 유저 이름 초기 상태 빈 문자열
  // 로그인에서 ID 도 넘겨줘야 프로젝트 불러오기때 활용이 가능할듯

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
  // 프로젝트 불러오기 창 열기
  const openLoadProject = () => {
    setLoadProjectIsOpen(true);
  };
  // 프로젝트 불러오기 창 닫기
  const closeLoadProject = () => {
    setLoadProjectIsOpen(false);
  };
  // 로그아웃
  const logout = () => {
    setUserLoginState(false);
    setUserName(null);
  };
  const { myImageEditor } = props;
  let file;
  /*
  function base64ToBlob(data) {
  const rImageType = /data:(image\/.+);base64,/;
  let mimeString = '';
  let raw, uInt8Array, i;

  raw = data.replace(rImageType, (header, imageType) => {
    mimeString = imageType;

    return '';
  });

  raw = atob(raw);
  const rawLength = raw.length;
  uInt8Array = new Uint8Array(rawLength); // eslint-disable-line

  for (i = 0; i < rawLength; i += 1) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: mimeString });
}
*/
  // 프로젝트 저장
  const onClickSaveProject = (e) => {
    myImageEditor.current.imageEditorInst.ui.eventHandler.upload();
    // 1. JSON을 리턴받아 여기서 서버로 보낸다.
    // 2. JSON을 서버로 보내고 그 리턴값을 이용한다.
    // 둘 중 어느 방법으로 해야할까?
    // 일단 파일을 원본이미지, JSON까지해서 2개를 한번에 보내야하는데. action.js에서
    // 원본 이미지 파일을 가져올 수가 있나?
  };

  // 업로드
  const onClickLoad = (e) => {
    file = e.target.files[0];

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
        <button className="projectLoadBtn" onClick={openLoadProject}>
          프로젝트 불러오기
        </button>
        <LoadProjectForm
        loadProjectIsOpen={loadProjectIsOpen}
        closeLoadProject={closeLoadProject}></LoadProjectForm>
        <button className="projectSaveBtn" onClick={onClickSaveProject}>
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
