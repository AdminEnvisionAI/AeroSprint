// actions.js
export const ActionTypes = {
  REQUIREMENT_RESPONSE: "REQUIREMENT_RESPONSE",
  REQUIREMENT: "REQUIREMENT",
  REQUIREMENT_FILE: "REQUIREMENT_FILE",
  Testcase_FILE: "Testcase_FILE",
  USERSTORY_DATA: "USERSTORY_DATA",
  USERSTORY_DATA_TESTCASES: "USERSTORY_DATA_TESTCASES",
  TESTCASES_RESPONSE: "TESTCASES_RESPONSE",
  TESTCASE_DATA: "TESTCASE_DATA",
  USERSTORY_FILE: "USERSTORY_FILE",
  TESTCASE_FILE: "TESTCASE_FILE", // Added "TESTCASE_FILE" action type
  CONTEXT_DATA: "CONTEXT_DATA",
  START_LOADING: "START_LOADING",
  STOP_LOADING: "STOP_LOADING",
  SETTING_DATA: "SETTING_DATA",

  // User Story State
  USERSTORY_SETTING_DATA: "USERSTORY_SETTING_DATA",
  REQUIREMENT_SETTING_DATA: "REQUIREMENT_SETTING_DATA",

  US_INDUSTRY: "US_INDUSTRY",
  US_DOMAIN: "US_DOMAIN",
  US_SUBDOMAIN: "US_SUBDOMAIN",
  US_COREAREA: "US_COREAREA",
  US_COMPLIANCE: "US_COMPLIANCE",
  US_KEYWORDS: "US_KEYWORDS",
  US_DEVELOPMENTTYPE: "US_DEVELOPMENTTYPE",
  US_USERSTORYGOALS: "US_USERSTORYGOALS",
};

export const startLoading = () => {
  return {
    type: ActionTypes.START_LOADING,
  };
};

export const stopLoading = () => {
  return {
    type: ActionTypes.STOP_LOADING,
  };
};
export const requirementResponse = (data) => ({
  type: ActionTypes.REQUIREMENT_RESPONSE,
  payload: data,
});
export const userstoryData = (data) => ({
  type: ActionTypes.USERSTORY_DATA,
  payload: data,
});
export const userstoryDataForTestCase = (data) => ({
  type: ActionTypes.USERSTORY_DATA_TESTCASES,
  payload: data,
});
export const testCaseData = (data) => ({
  type: ActionTypes.TESTCASES_RESPONSE,
  payload: data,
});
export const contextData = (data) => ({
  type: ActionTypes.CONTEXT_DATA,
  payload: data,
});
export const requirement = (data) => ({
  type: ActionTypes.REQUIREMENT,
  payload: data,
});
export const settingData = (data) => ({
  type: ActionTypes.SETTING_DATA,
  payload: data,
});
export const userStorySettingData = (data) => ({
  type: ActionTypes.USERSTORY_SETTING_DATA,
  payload: data,
});
export const requirementSettingData = (data) => ({
  type: ActionTypes.REQUIREMENT_SETTING_DATA,
  payload: data,
});
export const uploadedRequirementFile = (file) => {
  if (file) {
    return {
      type: ActionTypes.REQUIREMENT_FILE,
      payload: file,
    };
  } else {
    return {
      type: ActionTypes.REQUIREMENT_FILE,
      payload: null,
    };
  }
};
export const uploadedTestCasesFile = (file) => {
  if (file) {
    return {
      type: ActionTypes.Testcase_FILE,
      payload: file,
    };
  } else {
    return {
      type: ActionTypes.Testcase_FILE,
      payload: null,
    };
  }
};
export const uploadedUserstoryFile = (file) => ({
  type: ActionTypes.USERSTORY_FILE,
  payload: file,
});

export const US_INDUSTRY = (data) => {
  return {
    type: ActionTypes.US_INDUSTRY,
    payload: data,
  };
};

export const US_DOMAIN = (data) => {
  return {
    type: ActionTypes.US_DOMAIN,
    payload: data,
  };
};
export const US_SUBDOMAIN = (data) => {
  return {
    type: ActionTypes.US_SUBDOMAIN,
    payload: data,
  };
};
export const US_COREAREA = (data) => {
  return {
    type: ActionTypes.US_COREAREA,
    payload: data,
  };
};
export const US_COMPLIANCE = (data) => {
  return {
    type: ActionTypes.US_COMPLIANCE,
    payload: data,
  };
};
export const US_KEYWORDS = (data) => {
  return {
    type: ActionTypes.US_KEYWORDS,
    payload: data,
  };
};
export const US_DEVELOPMENTTYPE = (data) => {
  return {
    type: ActionTypes.US_DEVELOPMENTTYPE,
    payload: data,
  };
};

export const US_USERSTORYGOALS = (data) => {
  return {
    type: ActionTypes.US_USERSTORYGOALS,
    payload: data,
  };
};
