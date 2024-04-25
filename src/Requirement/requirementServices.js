// UserStoryServices.js
import axios from "axios";
import { requirementResponse } from "../reduxStore/actions";

const fetchRequirementData = async (query, context, dispatch, setting) => {
  if (!query) {
    return;
  }
  const data = {
    q: query,
    keywords: setting.keywords,
    industry: setting.industry,
    compliances: setting.compliance,
    domain: setting.domain,
    subdomain: setting.subdomain,
    corearea: setting.corearea,
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
  // formData.append("context", context);
  formData.append("keywords", setting.keywords);
  // formData.append("industry", "Banking");
  // formData.append("compliances", "GDPR");

  formData.append("industry", setting.industry);
  formData.append("compliances", setting.compliances);

  formData.append("domain", setting.domain);
  formData.append("subdomain", setting.subdomain);
  formData.append("corearea", setting.corearea);

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
