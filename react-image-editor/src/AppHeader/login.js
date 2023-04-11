import React, { useState } from "react";
//import { loginUser } from "../loginAction";
function Login(props) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Message, setMessage] = useState("");

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };
  /*
  const onSubmitHandler = (e) => {
    e.preventDefault();

    let userData = {
      email: Email,
      password: Password,
    };

    dispatch(loginUser(userData)).then((response) => {
      if (response.payload.loginSuccess) {
        navigate(-1);
      } else {
        alert("Error");
      }
    });
  };
*/
  return (
    <div
    //onSubmit={onSubmitHandler}
    >
      <form>
        <label>이메일</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>비밀번호</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <p className="message"> {Message} </p>
        <br />
        <button>로그인</button>
      </form>
    </div>
  );
}

export default Login;
