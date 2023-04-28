import React from 'react'

export default function addMemberForm() {
  const iframePart = () => {
    return {
      __html: `<iframe src="./html/addMemberForm.html" width="1024px" height="720px"></iframe>`,
    };
  };
  
  return (
  <div
    dangerouslySetInnerHTML={iframePart()}
  />

  );
}
/*
export default function loginForm() {
  return <>
    <h1>회원가입 페이지</h1>
  </>;
}
*/