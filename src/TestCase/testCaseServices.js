/* eslint-disable */
import axios from "axios";
// import { userstoryData } from "../reduxStore/actions";

const testCasefetchData = async () => {
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

  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/fetch-testcases"
    );
    // dispatch(userstoryData(response.data.message));
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default testCasefetchData;
