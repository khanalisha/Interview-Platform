import React from "react";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";
import { LuMessagesSquare } from "react-icons/lu";
import { PiDesktopTowerDuotone } from "react-icons/pi";
import { FaRegStar } from "react-icons/fa";
import Container from "../container/Container";

export const MiddleSection = () => {
  return (
    <Container>
      <div className="pb-7">
        <p className="bottom-p1">Tailored solution to make you</p>
        <p className="pb-10 bottom-p1">Interview Ready</p>
        <div className="flex gap-1 justify-evenly ">
          <div className="dark border border-solid cursor-pointer">
            <div className="border border-solid w-14 h-14  Icon">
              <HiOutlineQuestionMarkCircle
                className="w-12 h-12"
                style={{ color: "#f9d663" }}
              />
            </div>
            <p className="text-left pt-2 style-p-tag">
              Tailored interview questions
            </p>
            <p className="text-left style-p-tag">
              Receive customised interview and follow-up questions aligned with
              the skills or role you’re practicing for.
            </p>
          </div>
          <div className="dark border border-solid cursor-pointer ">
            <div className="border border-solid w-14 h-14  Icon">
              <LuMessagesSquare
                className="w-12 h-12"
                style={{ color: "#f9d663" }}
              />
            </div>
            <p className="text-left pt-2 style-p-tag">Interactive interviews</p>
            <p className="text-left style-p-tag">
              Experience realistic and dynamic interview sessions , that adapts
              to your responses.
            </p>
          </div>
          <div className="dark border border-solid cursor-pointer">
            <div className="border border-solid w-14 h-14  Icon">
              <FaRegStar className="w-12 h-12" style={{ color: "#f9d663" }} />
            </div>
            <p className="text-left pt-2 style-p-tag">Comprehensive Feedback</p>
            <p className="text-left style-p-tag">
              Gain insights on your interview performance, get tailored
              suggestions to enhance your interview skills.
            </p>
          </div>
          <div className="dark border border-solid cursor-pointer">
            <div className="border border-solid w-14 h-14  Icon">
              <PiDesktopTowerDuotone
                className="w-12 h-12"
                style={{ color: "#f9d663" }}
              />
            </div>
            <p className="text-left pt-2 style-p-tag">
              Practice anytime, anywhere
            </p>
            <p className="text-left style-p-tag">
              Receive customised interview and follow-up questions aligned with
              the skills or role you’re practicing for.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};
