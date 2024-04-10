/* eslint-disable */
import axios from "axios";
import { userstoryData } from "../reduxStore/actions";

const fetchData = async (query, dispatch, userStorySetting) => {
  const data = {
    keywords: ["accessibility"],
    Industry: "Banking",
    compliances: ["accessibility"],
    format: "gherkin",
  };

  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/fetch-user-query-response",
      data
    );
    dispatch(userstoryData(response.data.message));
    return response.data.message;
  } catch (error) {
    console.log(error);
  }
};

export const fetchFileUserStoryData = async (
  file,
  context,
  dispatch,
  userStorySetting
) => {
  if (!file) {
    return;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("keywords", userStorySetting.keywords);
  formData.append("industry", userStorySetting.industry);
  formData.append("compliance", userStorySetting.compliance);

  try {
    const response = await axios.post(
      "http://localhost:8000/file-upload-user-story",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch(userstoryData(response.data.message));
  } catch (error) {
    console.log(error);
  }
};

export default fetchData;