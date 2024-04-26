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

// export const fetchFileUserStoryData = async (
//   file,
//   context,
//   dispatch,
//   userStorySetting
// ) => {
//   if (!file) {
//     return;
//   }
//   // const formData = new FormData();
//   // formData.append("file", file);
//   // // formData.append("keywords", "accessibility");
//   // // formData.append("industry", "Banking");
//   // // formData.append("compliances", "accessibility");

//   // formData.append("keywords", userStorySetting.keywords);
//   // formData.append("industry", userStorySetting.industry);
//   // formData.append("compliances", userStorySetting.compliances);

//   // formData.append("domain", userStorySetting.domain);
//   // formData.append("subdomain", userStorySetting.subdomain);
//   // formData.append("corearea", userStorySetting.corearea);

//   const data = {
//     file: file, // Assuming 'file' is a File object
//     keywords: userStorySetting.keywords,
//     industry: userStorySetting.industry,
//     compliances: userStorySetting.compliance,
//     domain: userStorySetting.domain,
//     subdomain: userStorySetting.subdomain,
//     corearea: userStorySetting.corearea,
//   };

//   // Convert the object to JSON string
//   const jsonData = JSON.stringify(data);

//   try {
//     const response = await axios.post(
//       "http://localhost:8000/file-upload-user-story",
//       jsonData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );
//     dispatch(userstoryData(response.data.message));
//   } catch (error) {
//     console.log(error);
//   }
// };

export const fetchUserStoryFromFilePath = async (
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
      const userStories = await fetchRequirementsFileMetaData(dispatch, file.name, fileID, userStorySetting); // Pass appropriate data

      // Dispatch action to update state with user stories
      dispatch(userstoryData(userStories));
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

export const fetchRequirementsFileMetaData = async (
  dispatch,
  filename,
  fileID ="test",
  userStorySetting
) => {
  const data = {
    filename: filename,
    fileID: fileID,
    keywords: userStorySetting.keywords,
    industry: userStorySetting.industry,
    compliances: userStorySetting.compliance,
    domain: userStorySetting.domain,
    subdomain: userStorySetting.subdomain,
    corearea: userStorySetting.corearea,
  };

  console.log(data)

  // Convert the object to JSON string
  const jsonData = JSON.stringify(data);
  try {
    const response = await axios.post(
      "http://localhost:8000/fetch-userStory",
      jsonData,
      {
        headers: {
          "Content-Type": "application/json",
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
