import React, { useRef } from "react";
import { saveAs } from "file-saver";
import { useNavigate } from 'react-router-dom';
import {base64ToBlob} from "./util"

const AppHeader = (props) => {
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
  const navigate = useNavigate();
  const goUrlSignUp = () => {
      navigate('/signUp');
  };
  const goUrlLogin = () => {
      navigate('/login');
  };

  return (
    <div className="AppHeader">
      <div className="title">이미지 에디터</div>
      <div className="buttons">
        <button className="signUpBtn" onClick = {goUrlSignUp}>
          회원가입
        </button>
        <button className="loginBtn" onClick = {goUrlLogin}>
          로그인
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
