import "tui-image-editor/dist/tui-image-editor.css";
import ImageEditor from "@toast-ui/react-image-editor";
import locale_kor from "./locale_kor";

const myTheme = {
  // Theme object to extends default dark theme.
};

const App = () => (
  <ImageEditor
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
);
/* 에디터 크기 조정? 이미지 빅데이터 제공은 어떻게?
회원가입? 업로드/다운로드 이외에 무슨 버튼을 더 만들 것인지?
블로그 연동? css 디자인?

import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/

export default App;
