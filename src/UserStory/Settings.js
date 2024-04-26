import React, { useEffect, useState } from "react";
import "./userStory.css";
import { connect, useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading, userStorySettingData } from "../reduxStore/actions";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import MuiCheckbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Text from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";

const UserStory = () => {
  const dispatch = useDispatch();
  const [settinginfo, setsettinginfo] = useState(false);
  const [selectedLabels, setSelectedLabels] = useState([]);

  // const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    industry: "",
    domain: "",
    subdomain: "",
    corearea: "",
    compliance: [],
    keywords: "",
    developmentType: "",
    userstorygoals: ""
  });
  const industryOptions = [{ value: "BFSI", label: "BFSI" }];
  const developmentType = [
    { value: "Fresh", label: "Fresh" },
    { value: "Enhancement", label: "Enhancement" },
    { value: "Modernization", label: "Modernization" },
    { value: "Integration", label: "Integration Only" }
  ];
  
  const userstorygoals = [
    { value: "Solving a Problem", label: "Solving a Problem" },
    { value: "Improving Efficiency", label: "Improving Efficiency" },
    { value: "Enhancing User Experience", label: "Enhancing User Experience" },
    { value: "Enabling Innovation", label: "Enabling Innovation" },
    { value: "Reporting solution", label: "Reporting solution" }
];

  const handleCheckboxChange = (event) => {
    const label = event.target.name;
    const isChecked = event.target.checked;

    let updatedLabels;

    if (isChecked) {
      updatedLabels = [...selectedLabels, label];
    } else {
      updatedLabels = selectedLabels.filter((prevLabel) => prevLabel !== label);
    }

    setSelectedLabels(updatedLabels);

    // Store updatedLabels in local storage

    dispatch(
      userStorySettingData({
        ...userStorySetting,
        compliance: updatedLabels,
      })
    );
  };

  const handleChange = (event) => {
    console.log('userStorySetting ',userStorySetting)
    const { name, value } = event.target;
    dispatch(
      userStorySettingData({
        ...userStorySetting,
        [name]: value,
      })
    );
  };

  const userStorySetting = useSelector((state) => state.userStorySetting);
  const complianceLabels = useSelector((state) => state.userStorySetting.compliance);
  useEffect(() => {
    if (complianceLabels) {
      setSelectedLabels(complianceLabels);
    }
  }, []);
  useEffect(() => {
    setFormData(userStorySetting);
  }, [userStorySetting]);

  return (
    <div className="container">
      <div className="row gx-0">
        <div className="col-12 story-column">
          <div className="story-column-3">
            <div className="text_circle_box">
              <h5 className="import_story_text">Configurations</h5>
              <Tippy content="jep" visible={settinginfo}>
                <i
                  className="uil uil-info-circle"
                  onClick={() => {
                    setsettinginfo(!settinginfo);
                    setTimeout(() => {
                      setsettinginfo(false);
                    }, 2200);
                  }}
                ></i>
              </Tippy>
            </div>
          </div>
          <div className="story-column-4">
          <div className="setting_session_flex">
              <div className="keywords_box">
                <h5 className="import_story_text" style={{ marginTop: "0.5rem", width: "17%" }}>
                  Development Type
                </h5>
                <Select
                  name="developmentType"
                  value={formData?.developmentType || userStorySetting?.developmentType}
                  onChange={(event) => handleChange(event)}
                  style={{ width: "29.4%" }}
                  className="muiselect"
                >
                  <MenuItem value={0}>Select</MenuItem>
                  {developmentType.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </div>
           </div>
           <div className="setting_session_flex">
              <div className="keywords_box">
                <h5 className="import_story_text" style={{ marginTop: "0.5rem", width: "17%" }}>
                  Purpose and Goals
                </h5>
                <Select
                  name="userystorygoals"
                  value={formData?.userstorygoals || userStorySetting?.userstorygoals}
                  onChange={(event) => handleChange(event)}
                  style={{ width: "29.4%" }}
                  className="muiselect"
                >
                  <MenuItem value={0}>Select</MenuItem>
                  {userstorygoals.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </div>
           </div>
            <div className="setting_session_flex">
              <div className="keywords_box">
                <h5 className="import_story_text" style={{ marginTop: "0.5rem", width: "37%" }}>
                  Industry
                </h5>
                <Select
                  name="industry"
                  value={formData?.industry || userStorySetting?.industry}
                  onChange={(event) => handleChange(event)}
                  style={{ width: "29.4%" }}
                  className="muiselect"
                >
                  <MenuItem value={0}>Select</MenuItem>
                  {industryOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div className="keywords_box">
                <h5 className="import_story_text" style={{ marginTop: "0.5rem" }}>
                  Domain
                </h5>
                <Select
                  name="domain"
                  value={userStorySetting?.domain || formData?.domain}
                  onChange={(event) => handleChange(event)}
                  className="muiselect"
                  style={{ width: "65%", marginLeft: "4%" }}
                >
                  <MenuItem value="Select">Select</MenuItem>
                  <MenuItem value="Banking">Banking</MenuItem>
                  <MenuItem value="Insurance">Insurance</MenuItem>
                  <MenuItem value="CapitalMarkets">Capital Markets</MenuItem>
                  <MenuItem value="OtherFinancialServices">Other Financial Services</MenuItem>
                </Select>
              </div>
            </div>
            <div className="setting_session_flex">
              <div className="keywords_box">
                <h5 className="import_story_text" style={{ marginTop: "0.5rem", width: "40.5%" }}>
                  Sub Domain
                </h5>
                <Select
                  name="subdomain"
                  value={userStorySetting?.subdomain || formData?.subdomain}
                  onChange={handleChange}
                  className="muiselect"
                >
                  <MenuItem value="Select">Select</MenuItem>
                  <MenuItem value="Retail Banking">Retail Banking</MenuItem>
                  <MenuItem value="Commercial Banking">Commercial Banking</MenuItem>
                  <MenuItem value="Investment Banking">Investment Banking</MenuItem>
                  <MenuItem value="Private Banking">Private Banking</MenuItem>
                  <MenuItem value="Asset Management">Asset Management</MenuItem>
                  <MenuItem value="Wealth Management">Wealth Management</MenuItem>
                  <MenuItem value="Corporate Banking">Corporate Banking</MenuItem>
                  <MenuItem value="Treasury Services">Treasury Services</MenuItem>
                  <MenuItem value="Risk Management">Risk Management</MenuItem>
                  <MenuItem value="Technology and Innovation">Technology and Innovation</MenuItem>
                  <MenuItem value="Regulatory Compliance">Regulatory Compliance</MenuItem>
                  <MenuItem value="Credit and Lending">Credit and Lending</MenuItem>
                  <MenuItem value="Mortgage Services">Mortgage Services</MenuItem>
                  <MenuItem value="Payment Processing">Payment Processing</MenuItem>
                  <MenuItem value="Customer Service and Support">
                    Customer Service and Support
                  </MenuItem>
                  <MenuItem value="Financial Planning and Advisory">
                    Financial Planning and Advisory
                  </MenuItem>
                  <MenuItem value="Capital Markets">Capital Markets</MenuItem>
                  <MenuItem value="Insurance Services (for banks offering insurance products)">
                    Insurance Services (for banks offering insurance products)
                  </MenuItem>
                  <MenuItem value="Foreign Exchange Services">Foreign Exchange Services</MenuItem>
                  <MenuItem value="Trade Finance">Trade Finance</MenuItem>
                </Select>
              </div>

              <div className="keywords_box">
                <h5 className="import_story_text" style={{ marginTop: "0.5rem" }}>
                  Core Area
                </h5>
                <Select
                  type="select"
                  name="corearea"
                  value={userStorySetting?.corearea || formData?.corearea}
                  onChange={handleChange}
                  className="muiselect"
                  style={{ width: "65%", marginLeft: "0.3rem" }}
                >
                  <MenuItem value="Select">Select</MenuItem>
                  <MenuItem value="CapitalMarkets">Capital Markets</MenuItem>
                  <MenuItem value="DepositAccounts">Deposit Accounts</MenuItem>
                  <MenuItem value="ConsumerLoans">Consumer Loans</MenuItem>
                  <MenuItem value="CreditCards">Credit Cards</MenuItem>
                  <MenuItem value="Mortgages">Mortgages</MenuItem>
                  <MenuItem value="DebitCards">Debit Cards</MenuItem>
                  <MenuItem value="OnlineandMobileBanking">Online and Mobile Banking</MenuItem>
                  <MenuItem value="ATMServices">ATM Services</MenuItem>
                  <MenuItem value="BranchBanking">Branch Banking</MenuItem>
                  <MenuItem value="CustomerServiceandSupport">
                    Customer Service and Support
                  </MenuItem>
                  <MenuItem value="FinancialEducationandCounseling">
                    Financial Education and Counseling
                  </MenuItem>
                  <MenuItem value="OverdraftProtection">Overdraft Protection</MenuItem>
                  <MenuItem value="FraudPreventionandSecurity">
                    Fraud Prevention and Security
                  </MenuItem>
                  <MenuItem value="RewardsandLoyaltyPrograms">
                    Rewards and Loyalty Programs
                  </MenuItem>
                  <MenuItem value="ForeignCurrencyServices">Foreign Currency Services</MenuItem>
                  <MenuItem value="SmallBusinessBanking">Small Business Banking</MenuItem>
                </Select>
              </div>
            </div>
            <div className="setting_session_flex">
              <div className="keywords_box">
                <h5 className="import_story_text" style={{ marginTop: "0.5rem", width: "17%" }}>
                  Applicable Compliance
                </h5>
                <FormGroup row={true}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={complianceLabels?.includes("ISO 27001")}
                        onChange={handleCheckboxChange}
                        name="ISO 27001"
                      />
                    }
                    label="ISO 27001"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={complianceLabels?.includes("GDPR")}
                        onChange={handleCheckboxChange}
                        name="GDPR"
                      />
                    }
                    label="GDPR"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={complianceLabels?.includes("WCAG 2.0 AA")}
                        onChange={handleCheckboxChange}
                        name="WCAG 2.0 AA"
                      />
                    }
                    label="WCAG 2.0 AA"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={complianceLabels?.includes("PSD2")}
                        onChange={handleCheckboxChange}
                        name="PSD2"
                      />
                    }
                    label="PSD2"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={complianceLabels?.includes("ADA")}
                        onChange={handleCheckboxChange}
                        name="ADA"
                      />
                    }
                    label="ADA"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={complianceLabels?.includes("HIPAA")}
                        onChange={handleCheckboxChange}
                        name="HIPAA"
                      />
                    }
                    label="HIPAA"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={complianceLabels?.includes("RBI")}
                        onChange={handleCheckboxChange}
                        name="RBI"
                      />
                    }
                    label="RBI"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={complianceLabels?.includes("NIPL")}
                        onChange={handleCheckboxChange}
                        name="NIPL"
                      />
                    }
                    label="NIPL"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={complianceLabels?.includes("NPCL")}
                        onChange={handleCheckboxChange}
                        name="NPCL"
                      />
                    }
                    label="NPCL"
                  />
                  {/* Add more checkboxes as needed */}
                </FormGroup>
              </div>
            </div>
            <div className="setting_session_flex">
              <div className="keywords_box">
                <h5 className="import_story_text" style={{ marginTop: "0.5rem", width: "17%" }}>
                  Keywords
                </h5>
                <Text
                  name="keywords"
                  onChange={(event) => handleChange(event)}
                  type="input"
                  style={{ width: "40%", marginLeft: "0.0rem" }}
                  value={userStorySetting?.keywords || formData?.keywords}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.requirementResponse,
    uploadedUserstoryFile: state.uploadedUserstoryFile,
    loading: state.loading,
    userStorySetting: state.userStorySetting,
  };
};

const mapDispatchToProps = {
  startLoading,
  stopLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserStory);
