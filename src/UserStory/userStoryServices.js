/* eslint-disable */
import axios from "axios";
import { userstoryData } from "../reduxStore/actions";

const fetchData = async (query, dispatch, userStorySetting) => {
  console.log('userStorySetting ', userStorySetting)
  const data = {
    q: query,
    keywords: userStorySetting.keywords,
    industry: userStorySetting.industry,
    compliances: userStorySetting.compliances,
    domain: userStorySetting.domain,
    subdomain: userStorySetting.subdomain,
    corearea: userStorySetting.corearea,
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

  console.log('userStorySetting ', userStorySetting)

  const formData = new FormData();
  formData.append("file", file);
  // formData.append("keywords", "accessibility");
  // formData.append("industry", "Banking");
  // formData.append("compliances", "accessibility");

  formData.append("keywords", userStorySetting.keywords);
  formData.append("industry", userStorySetting.industry);
  formData.append("compliances", userStorySetting.compliances);

  formData.append("domain", userStorySetting.domain);
  formData.append("subdomain", userStorySetting.subdomain);
  formData.append("corearea", userStorySetting.corearea);

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

export const fetchRequirementsFromFilePath = async (
  file,
  context,
  dispatch,
  userStorySetting
) => {
  if (!file) {
    return;
  }
  
  console.log('userStorySetting ', userStorySetting)
  const formData = new FormData();
  formData.append("file", file);
  formData.append("keywords", userStorySetting.keywords);
  formData.append("industry", userStorySetting.industry);
  formData.append("compliances", userStorySetting.compliance);

  formData.append("domain", userStorySetting.domain);
  formData.append("subdomain", userStorySetting.subdomain);
  formData.append("corearea", userStorySetting.corearea);

  try {
    const response = await axios.post(
      "http://localhost:8000/file-upload-parser-requirement",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch(userstoryData(response.data.message));
  } catch (error) {
    // handle error
    console.log(error);
  }
};

export default fetchData;
