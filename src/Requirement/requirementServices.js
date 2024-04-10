// UserStoryServices.js
import axios from "axios";
import { requirementResponse } from "../reduxStore/actions";

const fetchRequirementData = async (query, context, dispatch, setting) => {
  if (!query) {
    return;
  }
  const data = {
    q: query,
    context: context,
    keywords: [setting.keywords],
    Industry: setting.industry,
    compliances: [setting.compliance],
    format: "gherkin",
  };

  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/fetch-requirement",
      data
    );
    dispatch(requirementResponse(response.data.message));
    return response.data.message;
  } catch (error) {
    // handle error
    console.log(error);
  }
};

export const fetchFileRequirementData = async (
  file,
  context,
  dispatch,
  setting
) => {
  if (!file) {
    return;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("context", context);
  formData.append("keywords", setting.keywords);
  formData.append("industry", setting.industry);
  formData.append("compliance", setting.compliance);

  try {
    const response = await axios.post(
      "http://localhost:8000/file-upload-requirement",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch(requirementResponse(response.data.message));
  } catch (error) {
    // handle error
    console.log(error);
  }
};

export default fetchRequirementData;
