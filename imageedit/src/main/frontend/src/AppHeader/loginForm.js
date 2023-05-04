import React from "react";
export default function loginForm() {
  const iframePart = () => {
    return {
      __html: `<iframe src="./html/loginForm.html" width="1024px" height="720px"></iframe>`,
    };
  };

  return <div dangerouslySetInnerHTML={iframePart()} />;
}
/*
export default function loginForm() {
  return <>
    <h1>로그인 페이지</h1>
  </>;
}
*/
