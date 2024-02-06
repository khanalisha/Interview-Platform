const { UserModel } = require("../model/user");

const UserInterviewData = async (req, res, next) => {
  const userId = req.userId;
  console.log(userId, "userInterviews");
  try {
    const user = await UserModel.findById(userId).populate({
      path: "userPastInterview",
    });
    const interviews = user.userPastInterview;
    console.log(interviews);
    res
      .status(200)
      .json({ message: "Users Interview fetched Successfully", interviews });
  } catch (error) {
    res
      .status(404)
      .json({ message: "couldn't fetch user interviews", error: error });
  }
};

module.exports = {
  UserInterviewData,
};
