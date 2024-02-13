import React from "react";
import { TiTick } from "react-icons/ti";
import Container from "../container/Container";

export const Hero = () => {
  return (
    <Container>
      <div className=" flex justify-center bg-#fffff text-white p-16 gap-64">
        <div className=" flex justify-center container mx-auto w-[70%] border border solid">
          <img src="heroimg.jpeg" alt="" className="w-[100%]" />
        </div>
        <div className="container mx-auto">
          <div className="text-left">
            <h3 className="text-2xl text-[#1F2041] font-bold leading-8 font-sans">
              Roadmaps
            </h3>

            <p className="pt-4 text-[#000000a3] font-normal text-base leading-6 font-serif">
              Explore the guided learning path for different roles <br />
              or skills thatyou want to learn, revise, or test your expertise
              for.
            </p>
            <div className="pt-4">
              {/* <span className="">
                <TiTick className="bg-[#000000a3]" />
              </span> */}
              <p className=" text-[#000000a3] font-normal text-base leading-6 font-serif hero-p">
                Tailored learning path with interviews to help you succeed.
              </p>
              <p className=" text-[#000000a3] font-normal text-base leading-6 font-serif hero-p">
                Learning materials to help you ace your interview prep.
              </p>
              <p className=" text-[#000000a3] font-normal text-base leading-6 font-serif hero-p">
                Track your progress
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
