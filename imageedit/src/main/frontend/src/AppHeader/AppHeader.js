import React, { useRef, useState } from "react";
import { saveAs } from "file-saver";
import axios from "axios";
import AddMemberForm from "./AddMemberForm";
import LoginForm from "./LoginForm";
import ChatGPTForm from "./ChatGPTForm";
//import fs from 'fs';

const AppHeader = (props) => {
  const fileUploadInput = useRef(null);

  const [useChatGPTIsOpen, setUseChatGPTIsOpen] = useState(false); // ChatGPT 이용 창의 초기 표시 유무 false
  const [addMemberIsOpen, setAddMemberIsOpen] = useState(false); // 회원가입 창의 초기 표시 유무 false
  const [loginIsOpen, setLoginIsOpen] = useState(false); // 로그인 창의 초기 표시 유무 false
  const [userLoginState, setUserLoginState] = useState(false); // 로그인 유무 초기 상태 false
  const [userName, setUserName] = useState(null); // 유저 이름 초기 상태 빈 문자열
  const [userEmail, setUserEmail] = useState(null); // 유저 이메일 초기 상태 빈 문자열

  // ChatGPT 창 열기
  const openUseChatGPT = () => {
    setUseChatGPTIsOpen(true);
  };
  // ChatGPT 창 닫기
  const closeUseChatGPT = () => {
    setUseChatGPTIsOpen(false);
  };
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

  // 로그아웃
  const logout = () => {
    setUserLoginState(false);
    setUserEmail(null);
    setUserName(null);
  };
  const { myImageEditor } = props;
  console.log(myImageEditor);

  // base64 -> Blob
  const base64ToBlob = (data) => {
    const rImageType = /data:(image\/.+);base64,/;
    let mimeString = "";
    let raw, uInt8Array, i;

    raw = data.replace(rImageType, (header, imageType) => {
      mimeString = imageType;

      return "";
    });

    raw = atob(raw);
    const rawLength = raw.length;
    uInt8Array = new Uint8Array(rawLength); // eslint-disable-line

    for (i = 0; i < rawLength; i += 1) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: mimeString });
  };

  let file = null;

  // 프로젝트 불러오기
  const onClickLoadProject = async (e) => {
    if (userLoginState === false) {
      alert("프로젝트 저장/불러오기 기능은 로그인 상태에서만 이용 가능합니다!");
      return;
    }
    //myImageEditor.current.imageEditorInst.ui.eventHandler.retrieve(userEmail);
    await axios
      // /download 주소로 데이터 전달
      .post("/download", {
        loginId: userEmail,
      })
      .then((response) => {
        // 성공했다면
        if (response.data !== "") {
          console.log(response.data.path);
          console.log(response.data.stack);
          let path = response.data.path;
          let stack = JSON.parse(response.data.stack);

          // 이미지 파일 로드
          /*
          myImageEditor.current.imageEditorInst.loadImageFromURL(
            `${path}`,
            "image"
          );
          myImageEditor.current.imageEditorInst.ui.eventHandler.loadImage(file);
          myImageEditor.current.imageEditorInst._actions.main.load(file);
          */

          // 스택 데이터 Push
          for (let i = 0; i < stack.stackData.undoStack.length; i++)
            myImageEditor.current.imageEditorInst._invoker.pushUndoStack(
              stack.stackData.undoStack[i]
            );
          for (let i = 0; i < stack.stackData.redoStack.length; i++)
            myImageEditor.current.imageEditorInst._invoker.pushRedoStack(
              stack.stackData.redoStack[i]
            );
          // canvas 데이터로 작업 내역 복구
          let canvasData = stack.canvasData;
          //canvasData.backgroundImage.src = path;
          let canvas =
            myImageEditor.current.imageEditorInst._graphics.getCanvas();
          canvas.loadFromJSON(canvasData, canvas.renderAll.bind(canvas));
          /*
          let readFile = fs.readFileSync(`${path}`); //이미지 파일 읽기
          let base64Image = Buffer.from(readFile).toString('base64'); //파일 인코딩
          */
          //myImageEditor.current.imageEditorInst.loadImageFromFile(file);
        } else {
          // 실패했다면
          alert("프로젝트 불러오기에 실패하였습니다!");
        }
      })
      .catch((error) => {
        // 에러메시지 콘솔 출력
        console.log(error);
      });
  };

  // 프로젝트 저장
  const onClickSaveProject = async (e) => {
    if (userLoginState === false) {
      alert("프로젝트 저장/불러오기 기능은 로그인 상태에서만 이용 가능합니다!");
      return;
    }
    if (file === null) {
      alert("샘플 이미지는 저장할 수 없습니다!");
      return;
    }
    // file = base64ToBlob(myImageEditor.current.imageEditorInst.toDataURL());
    // myImageEditor.current.imageEditorInst.ui.eventHandler.upload(userEmail,file);
    console.log(
      base64ToBlob(myImageEditor.current.imageEditorInst.toDataURL())
    );
    let commandJson =
      `{"undoStack":` +
      JSON.stringify(
        myImageEditor.current.imageEditorInst._invoker.getUndoStack()
      ) +
      `,"redoStack":` +
      JSON.stringify(
        myImageEditor.current.imageEditorInst._invoker.getRedoStack()
      ) +
      "}";

    let canvas = myImageEditor.current.imageEditorInst._graphics.getCanvas();
    let canvasJson = canvas.toJSON();
    canvasJson = JSON.stringify(canvasJson);

    let projectJson =
      `{"stackData":` + commandJson + `,"canvasData":` + canvasJson + "}";
    console.log("JSON 결과 : " + projectJson);

    let formData = new FormData();
    // userEmail 추가
    formData.append("loginId", userEmail);
    // image file 추가
    formData.append("blobs", file);
    // JSON 추가
    formData.append("stack", projectJson);

    for (let [key, value] of formData.entries())
      console.log(`key: ${key}, value: ${value}`);

    // Content-Type 지정
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    await axios
      // /upload 주소로 데이터 전달
      .post("/upload", formData, config)
      .then((response) => {
        // 성공했다면
        console.log(response.data);
        if (response.data === "성공") alert("성공적으로 저장되었습니다!");
        else alert("저장 실패하였습니다!");
      })
      .catch((error) => {
        // 에러메시지 콘솔 출력
        console.log(error);
      });
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
    /*
    myImageEditor.current.imageEditorInst.ui.eventHandler.download();
    npm run build, serve -s build는 정상적으로 실행
    npm run start는 작동하지 않음. 왜??
    */
    const dataURL = myImageEditor.current.imageEditorInst.toDataURL();
    let imageName = myImageEditor.current.imageEditorInst.getImageName();
    let blob, type, w;

    if (window.File && window.FileList && window.FileReader && window.saveAs) {
      blob = base64ToBlob(dataURL);
      type = blob.type.split("/")[1];
      if (imageName.split(".").pop() !== type) {
        imageName += `.${type}`;
      }
      saveAs(blob, imageName); // eslint-disable-line
    } else {
      w = window.open();
      w.document.body.innerHTML = `<img src='${dataURL}'>`;
    }
  };
  const searchUrl = "http://localhost:5000/";

  // 자식 컴포넌트(LoginForm)으로부터 userData 받아오기
  const getUserData = (name, email, loginState) => {
    setUserName(name);
    setUserEmail(email);
    setUserLoginState(loginState);
  };

  return (
    <div className="AppHeader">
      <div className="title">
        <img src="./img/titleLogo2.png" alt="logo" />
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
        <button className="chatGPTBtn" onClick={openUseChatGPT}>
          ChatGPT 이용
        </button>
        <ChatGPTForm useChatGPTIsOpen={useChatGPTIsOpen} closeUseChatGPT={closeUseChatGPT}>
        </ChatGPTForm>
        <button
          className="searchBtn"
          onClick={() => {
            window.open(searchUrl);
          }}
        >
          이미지 검색
        </button>
        <button
          style={
            userLoginState === false
              ? {
                  backgroundColor: "#868686",
                  opacity: 0.6,
                  cursor: "default",
                }
              : {}
          }
          className="projectLoadBtn"
          onClick={onClickLoadProject}
        >
          프로젝트 불러오기
        </button>
        <button
          style={
            userLoginState === false
              ? {
                  backgroundColor: "#868686",
                  opacity: 0.6,
                  cursor: "default",
                }
              : {}
          }
          className="projectSaveBtn"
          onClick={onClickSaveProject}
        >
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
