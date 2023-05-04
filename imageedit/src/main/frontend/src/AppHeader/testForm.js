import React, { useState, useEffect } from "react";

const TestForm = () => {
  const [msg, setMsg] = useState([]);
  useEffect(() => {
    fetch("/api/test")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setMsg(data);
      });
  }, []);
  return (
    <div>
      <header>
        <ul>
          {msg.map((content, idx) => (
            <li key={`${idx} - ${content}`}>{content}</li>
          ))}
        </ul>
      </header>
    </div>
  );
};

export default TestForm;
