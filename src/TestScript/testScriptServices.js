/* eslint-disable */
import axios from "axios";

const testScriptfetchData = async (userStoryData) => {
  const userStories = JSON.stringify(userStoryData);
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/fetch-test-scripts",
      userStories,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
    );
    // dispatch(testCaseData(response.data.message));
    console.log(response.data)
    return response.data.message;
  } catch (error) {
    console.log(error);
  }
};


export default testScriptfetchData;
