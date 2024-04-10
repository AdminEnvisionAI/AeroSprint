// actions.js
export const ActionTypes = {
  REQUIREMENT_RESPONSE: "REQUIREMENT_RESPONSE",
  REQUIREMENT: "REQUIREMENT",
  REQUIREMENT_FILE: "REQUIREMENT_FILE",
  USERSTORY_DATA: "USERSTORY_DATA",
  USERSTORY_FILE: "USERSTORY_FILE",
  CONTEXT_DATA: "CONTEXT_DATA",
  START_LOADING: "START_LOADING",
  STOP_LOADING: "STOP_LOADING",
  SETTING_DATA: "SETTING_DATA",
  USERSTORY_SETTING_DATA: "USERSTORY_SETTING_DATA",
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
export const uploadedUserstoryFile = (file) => ({
  type: "USERSTORY_FILE",
  payload: file,
});
