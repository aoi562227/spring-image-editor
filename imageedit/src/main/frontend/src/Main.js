import React, { useRef } from "react";
import "tui-image-editor/dist/tui-image-editor.css";
import ImageEditor from "@toast-ui/react-image-editor";
import locale_kor from "./locale_kor";
import AppHeader from "./AppHeader/AppHeader";

const myTheme = {
  // Theme object to extends default dark theme.
  "header.display": "none"
};

const Main = (props) => {
	const editorRef = useRef(null);

  return (
    <>
      <AppHeader myImageEditor={editorRef} />
      <ImageEditor
        ref={editorRef}
        includeUI={{
          loadImage: {
            path: "./img/sampleImage.png",
            name: "SampleImage",
          },
          locale: locale_kor,
          theme: myTheme,
          menu: [
            "crop",
            "flip",
            "rotate",
            "draw",
            "shape",
            "icon",
            "text",
            "mask",
            "filter",
          ],
          initMenu: "filter",
          uiSize: {
            width: "100%",
            height: "800px",
          },
          menuBarPosition: "left",
        }}
        cssMaxHeight={600}
        cssMaxWidth={1500}
        selectionStyle={{
          cornerSize: 20,
          rotatingPointOffset: 70,
        }}
        usageStatistics={false}
      />
    </>
  );
};

export default Main;
