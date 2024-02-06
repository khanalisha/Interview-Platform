import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Hero } from "./Hero";
import Container from "../container/Container";
import { MiddleSection } from "./MiddleSection";
import { Bottom } from "../Bottom";

const HomePage = () => {
  const isAuth = useSelector((store: any) => store.authReducer.isAuth);
  console.log(isAuth, "home");
  const token = localStorage.getItem("token")
  console.log(token,"homepage")
  const navigate = useNavigate();
  const handleClick = () => {
    if (token) {
      navigate("/interviewType");
    } else {
      navigate("/login");
    }
  };
  /**border border-solid border-black */
  return (
    <Container>
      <div className=" bg-primary-500">
        <div className="flex justify-center items-center min-h-[86vh] ">
          <div className="flex justify-center flex-col px-12 text-8xl  text-left">
            <p className="text-boldText text-5xl leading-[60px] font-sans font-bold ">
              Ace your next <br /> Dream Job{" "}
              <span className="text-primary-100">Interview</span>
            </p>
            <button
              className="h-[40px] text-xl hover hover:btn hover:text-[black] mt-[20px] text-white w-[130px] btn"
              onClick={handleClick}
            >
              Try it free
            </button>
          </div>

          <div className="flex justify-center items-center w-[50%]">
            <img className="rounded-3xl w-[80%]" src="AI_image2.jpg" alt="" />
          </div>
        </div>
        <Hero />
        <MiddleSection />
        <Bottom />
      </div>
    </Container>
  );
};

export default HomePage;
