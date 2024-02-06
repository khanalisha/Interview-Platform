import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Change_Type } from "../redux/actionType";

const CourseCard = ({
  type,
  description,
  image,
}: {
  type: String;
  description: String;
  image: any;
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const handleClick = () => {
    if (token === null) {
      navigate("/login");
    } else if (type) {
      dispatch({ type: Change_Type, payload: type });
      navigate(`/InterviewRoom`);
    }
  };
  console.log(type);
  return (
    <div className="shadow-lg text-center bg-primary rounded-lg p-4">
      <div className="flex items-center justify-center p-5">
        <img className=" h-40" src={image} alt="" />
        {/* border border-gray-300 */}
      </div>
      <h2 className="text-black md:text-3xl sm:text-2xl text-1xl font-bold">
        {type}
      </h2>
      <p className="p-4 w-[90%] m-auto text-center">{description}</p>
      <button
        onClick={handleClick}
        className="border-1 border-primary-200 p-2 rounded-lg bg-primary-200 hover:bg-[#4CDC69] hover:border-1 border-[#4CDC69]  hover:text-white"
      >
        Start Interview
      </button>
    </div>
  );
};

export default CourseCard;
