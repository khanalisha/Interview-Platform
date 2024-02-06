import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserDashboard = () => {
  const navigate=useNavigate()
  let token = localStorage.getItem("token") || "";

  // let userImage = localStorage.getItem("userImage") || "";
  const [interviews, setInterviews] = useState([]);
 

  useEffect(() => {
     if (!token) {
    navigate("/login")
  }
    fetchUserInterviews();
  }, []);
  async function fetchUserInterviews() {
    try {
      let res = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/interviews`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setInterviews(res.data.interviews);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="min-h-[86vh]">
      <h1 className="text-2xl mb-8">User's Past Interviews</h1>
      <div className="grid grid-cols-3 gap-4">
        {interviews.length > 0 &&
          interviews.map((el) => {
            return (
              <div
                key={el.userId}
                className="max-w-sm bg-white border  border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 "
              >
                <img
                  className="rounded-t-lg max-h-60 w-full"
                  // src={userImage}
                  alt=""
                />
                <div className="p-5">
                  {/* <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Noteworthy technology acquisitions 2021
                </h5> */}

                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    <strong>Type : </strong> {el.type}
                  </p>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400  ">
                    <strong>Feedback : </strong>{" "}
                    {el.feedback.split("").slice(0, 300).join("")}...
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
