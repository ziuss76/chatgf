import React, { useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    })
      .then((res) => res.json())
      .then((data) => setResponse(data.message));
  };

  return (
    <div className="App">
      <p>위대한 인류의 질문:</p>
      <form className="form" onSubmit={handleSubmit}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></input>
        <button className="button-8" type="submit">
          Submit
        </button>
      </form>
      <p>어리석은 기계의 대답:</p>
      <div className="answer">
        <div>{response}</div>
      </div>
    </div>
  );
}

export default App;
