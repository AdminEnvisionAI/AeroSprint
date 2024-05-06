/* eslint-disable */
import axios from "axios";
import { testCaseData } from "../reduxStore/actions";

const testCasefetchData = async (userStoryData) => {
  // console.log('userStorySetting ', userStorySetting)
  // const data = {
  //   q: query,
  //   keywords: userStorySetting.keywords,
  //   industry: userStorySetting.industry,
  //   compliances: userStorySetting.compliances,
  //   domain: userStorySetting.domain,
  //   subdomain: userStorySetting.subdomain,
  //   corearea: userStorySetting.corearea,
  //   format: "gherkin",
  // };

  const userStories = JSON.stringify(userStoryData);
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/fetch-testcases",
      userStories,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
    );

    dispatch(testCaseData(response.data.message));
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const testCasefetchFileData = async (
  file,
  dispatch
) => {
  if (!file) {
    return;
  }
  const formData = new FormData();
  formData.append("file", file);

  try {
    // Send file upload request
    const response = await axios.post(
      "http://localhost:8000/file-upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // Handle successful file upload response
    if (response.status === 200) {
      // Assuming the response contains a message or data for user stories
      const fileID = response.data.message; // Access the actual data from the response

      // Fetch additional requirements using the responseData (if applicable)
      // const userStoriesObj = 
      return await generateTestCasesUserStoryFile(dispatch, file.name, fileID); // Pass appropriate data

      // const userStories = userStoriesObj.map(obj => obj.userStory);
      // console.log('userStories ', userStories);
        
      // // Dispatch action to update state with user stories
      // dispatch(userstoryData(userStories));
    } else {
      // Handle non-200 status codes from the upload endpoint
      console.error("Error uploading file:", response.statusText);
      // You might want to dispatch an error action here to update the UI
    }

  } catch (error) {
    // Handle upload error
    console.error("Error uploading file:", error);
    // You might want to dispatch an error action here to update the UI
  }
};

export const generateTestCasesUserStoryFile = async (
  dispatch,
  filename,
  fileID ="test",
) => {
  const data = {
    filename: filename,
    fileID: fileID,
  };

  // Convert the object to JSON string
  const jsonData = JSON.stringify(data);
  try {
    const response = await axios.post(
      "http://localhost:8000/generate-testcase-file",
      jsonData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // const test_cases = [];
    // for (let item of response?.data) {
    //   for (let testCase of item) {
    //     console.log('testCase ', testCase);
    //     test_cases.push(testCase);
    //   }
    // }
    // dispatch(testCaseData(test_cases));
    dispatch(testCaseData(response?.data));
    return response?.data;
  } catch (error) {
    // handle error
    console.log(error);
  }
};


export default testCasefetchData;
