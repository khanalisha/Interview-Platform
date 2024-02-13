import React from "react";
import Container from "./container/Container";
import { useNavigate } from "react-router-dom";

export const Bottom = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/interviewType");
  };

  return (
    <Container>
      <div className="bottom-div border border-solid">
        <p className="bottom-p1">
          Experience the future of <br />
          Interview Preparation
        </p>

        <p className="pb-4 bottom-p2">
          Empowering candidates to ace interviews and excel in their careers,{" "}
          <br /> one success story at a time.
        </p>
        <button className="btn" onClick={handleClick}>
          Let's start
        </button>
      </div>
    </Container>
  );
};
