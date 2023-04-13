import React, { useState, useRef } from "react";
import SignUp from "./signUp";
import Login from "./login";
import Modal from "react-modal";
import { saveAs } from "file-saver";

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

const AppHeader = (props) => {
  const [signUpIsOpen, setSignUpIsOpen] = useState(false);
  const [loginIsOpen, setLoginIsOpen] = useState(false);
  const fileUploadInput = useRef(null);

  const { myImageEditor } = props;

  const onClickLoad = (e) => {
    const file = e.target.files[0];

    if (!(window.File && window.FileList && window.FileReader)) {
      alert("This browser does not support file-api");
    }

    myImageEditor.current.imageEditorInst.ui.initializeImgUrl =
      URL.createObjectURL(file);
    myImageEditor.current.imageEditorInst
      .loadImageFromFile(file)
      .then((sizeValue) => {
        myImageEditor.current.imageEditorInst.ui.exitCropOnAction();
        myImageEditor.current.imageEditorInst.ui.initFilterState();
        myImageEditor.current.imageEditorInst.ui.clearUndoStack();
        myImageEditor.current.imageEditorInst.ui.activeMenuEvent();
        myImageEditor.current.imageEditorInst.ui.resizeEditor({
          imageSize: sizeValue,
        });
        myImageEditor.current.imageEditorInst.ui._clearHistory();
        myImageEditor.current.imageEditorInst.ui._invoker.fire(
          myImageEditor.current.imageEditorInst.ui.eventNames.EXECUTE_COMMAND,
          myImageEditor.current.imageEditorInst.ui.historyNames.LOAD_IMAGE
        );
      })
      ["catch"]((message) => Promise.reject(message));
  };

  const onClickDownload = (e) => {
    const dataURL = myImageEditor.current.imageEditorInst.toDataURL();
    let imageName = myImageEditor.current.imageEditorInst.getImageName();
    let blob;
    let typeName;

    blob = base64ToBlob(dataURL);
    typeName = imageName.split(".").pop();
    saveAs(blob, imageName.split(".")[0] + "-edited." + typeName); // eslint-disable-line
  };

  return (
    <div className="AppHeader">
      <div className="title">이미지 에디터</div>
      <div className="buttons">
        <button className="signUpBtn" onClick={() => setSignUpIsOpen(true)}>
          회원가입
        </button>
        <Modal
          className="signUp"
          isOpen={signUpIsOpen}
          onRequestClose={() => setSignUpIsOpen(false)}
        >
          <SignUp />
          <button onClick={() => setSignUpIsOpen(false)}>Modal Open</button>
        </Modal>

        <button className="loginBtn" onClick={() => setLoginIsOpen(true)}>
          로그인
        </button>
        <Modal
          className="login"
          isOpen={loginIsOpen}
          onRequestClose={() => setLoginIsOpen(false)}
        >
          <Login />
          <button onClick={() => setLoginIsOpen(false)}>Modal Open</button>
        </Modal>

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
