import React, { useState, useEffect } from "react";

export default function AddMemberForm() {
  const [msg, setMsg] = useState([]);

  useEffect(() => {
    fetch("/add")
      .then((response) => {
        return response.text();
      })
      .then((html) => {
        setMsg(html);
      });
  }, []);

  const iframePart = () => {
    return {
      __html: msg,
    };
  };
  return <div dangerouslySetInnerHTML={iframePart()} />;
}
/*
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
export default function loginForm() {
  return <>
    <h1>회원가입 페이지</h1>
  </>;
}
*/
