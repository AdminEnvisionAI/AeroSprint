import { ActionTypes } from "./actions";

const initialState = {
  // Add more state properties for requirement here as needed
  requirement: "",
  uploadedRequirementFile: null,
  context: "",
  setting: {
    keywords: [],
    industry: "",
    compliance: [],
  },
  userStorySetting: {
    keywords: null,
    industry: null,
    compliance: null,
    corearea: null,
    subdomain: null,
    domain: null,
    developmenttype: null,
    userstorygoals: null,
    targetaudience: null,
  },
  requirementSetting: {
    keywords: null,
    industry: null,
    compliance: null,
    corearea: null,
    subdomain: null,
    domain: null,
    developmenttype: null,
    requirementgoals: null,
    targetaudience: null,
  },
  requirementResponse: "",
  // Add more state properties for user story here as needed
  userstoryResponse: "",
  uploadedUserstoryFile: null,
  document: "",
  upload: "",
  loading: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.REQUIREMENT_RESPONSE:
      return {
        ...state,
        requirementResponse: action.payload, // Merge new data with existing data
      };
    case ActionTypes.START_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.STOP_LOADING:
      return {
        ...state,
        loading: false,
      };
    case ActionTypes.USERSTORY_DATA:
      return {
        ...state,
        userstoryResponse: action.payload, // Merge new data with existing data
      };
    case ActionTypes.CONTEXT_DATA:
      return {
        ...state,
        context: action.payload, // Merge new data with existing data
      };
    case ActionTypes.REQUIREMENT:
      return {
        ...state,
        requirement: action.payload, // Merge new data with existing data
      };
    case ActionTypes.REQUIREMENT_FILE:
      return {
        ...state,
        uploadedRequirementFile: action.payload,
      };

    case ActionTypes.USERSTORY_FILE:
      return {
        ...state,
        uploadedUserstoryFile: {
          ...action.payload,
        },
      };
    case ActionTypes.SETTING_DATA:
      return {
        ...state,
        setting: action.payload, // Merge new data with existing data
      };
    case ActionTypes.USERSTORY_SETTING_DATA:
      return {
        ...state,
        userStorySetting: action.payload, // Merge new data with existing data
      };
    case ActionTypes.REQUIREMENT_SETTING_DATA:
      return {
        ...state,
        requirementSetting: action.payload, // Merge new data with existing data
      };

    default:
      return state;
  }
};

export default rootReducer;
