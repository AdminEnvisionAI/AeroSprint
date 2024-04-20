import React, { useState } from "react";
import "./requirement.css";
import {
  settingData,
  startLoading,
  stopLoading,
  uploadedRequirementFile,
  setting,
} from "../reduxStore/actions";
import { connect, useDispatch, useSelector } from "react-redux";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import MuiCheckbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Text from "@mui/material/TextField"
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";


const Requirement = ({ startLoading, stopLoading }) => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const setting = useSelector((state) => state.setting);
  const [settinginfo, setsettinginfo] = useState(false);
  const [formData, setFormData] = useState({
    industry: "",
    domain: "",
    subdomain: "",
    corearea: "",
    compliance: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  dispatch(settingData(formData));
  return (
    // <div>
      <div className="container">
        <div className="row gx-0">
          <div className="col-12 story-column">
            {isLoading && <div className="overlay"></div>}
            {isLoading && <div className="loader"></div>}
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
                  <h5
                    className="import_story_text"
                    style={{ marginTop: "0.5rem", width: "37%" }}
                  >
                    Industry
                  </h5>
                  <Select
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    id="cars"
                    style={{ width: "29.4%" }}
                    className="muiselect"
                    // className="compilance_select"
                  >
                    <MenuItem value={0}>Select</MenuItem>
                    <MenuItem value={"BFSI"}>BFSI</MenuItem>
                  </Select>
                </div>
                <div className="keywords_box">
                  <h5
                    className="import_story_text"
                    style={{ marginTop: "0.5rem" }}
                  >
                    Domain
                  </h5>
                  <Select
                    name="domain"
                    // value={setting.industry}
                    onChange={handleChange}
                    id="cars"
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
                  <h5
                    className="import_story_text"
                    style={{ marginTop: "0.5rem", width: "40.5%" }}
                  >
                    Sub Domain
                  </h5>
                  <Select
                    name="domain"
                    onChange={handleChange}
                    id="cars"
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
                    <MenuItem value="Customer Service and Support">Customer Service and Support</MenuItem>
                    <MenuItem value="Financial Planning and Advisory">Financial Planning and Advisory</MenuItem>
                    <MenuItem value="Capital Markets">Capital Markets</MenuItem>
                    <MenuItem value="Insurance Services (for banks offering insurance products)">Insurance Services (for banks offering insurance products)</MenuItem>
                    <MenuItem value="Foreign Exchange Services">Foreign Exchange Services</MenuItem>
                    <MenuItem value="Trade Finance">Trade Finance</MenuItem>
                  </Select>
                </div>

                <div className="keywords_box">
                  <h5
                    className="import_story_text"
                    style={{ marginTop: "0.5rem" }}
                  >
                    Core Area
                  </h5>
                  <Select
                  type="select"
                    name="corearea"
                    value={setting.corearea}
                    onChange={handleChange}
                    id="cars"
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
                    <MenuItem value="CustomerServiceandSupport">Customer Service and Support</MenuItem>
                    <MenuItem value="FinancialEducationandCounseling">Financial Education and Counseling</MenuItem>
                    <MenuItem value="OverdraftProtection">Overdraft Protection</MenuItem>
                    <MenuItem value="FraudPreventionandSecurity">Fraud Prevention and Security</MenuItem>
                    <MenuItem value="RewardsandLoyaltyPrograms">Rewards and Loyalty Programs</MenuItem>
                    <MenuItem value="ForeignCurrencyServices">Foreign Currency Services</MenuItem>
                    <MenuItem value="SmallBusinessBanking">Small Business Banking</MenuItem>
                  </Select>
                </div>
              </div>
              <div className="setting_session_flex">
                <div className="keywords_box">
                  <h5
                    className="import_story_text"
                    style={{ marginTop: "0.5rem", width: "17%" }}
                  >
                    Applicable Compliance
                  </h5>
                  <FormGroup row={true}>
                    <FormControlLabel control={<MuiCheckbox defaultChecked />} label="ISO 27001" />
                    <FormControlLabel control={<MuiCheckbox />} label="GDPR" />
                    <FormControlLabel control={<MuiCheckbox />} label="WCAG 2.0 AA" />
                    <FormControlLabel control={<MuiCheckbox />} label="PSD2" />
                    <FormControlLabel control={<MuiCheckbox />} label="ADA" />
                    <FormControlLabel control={<MuiCheckbox />} label="HIPAA" />
                    <FormControlLabel  control={<MuiCheckbox />} label="RBI" />
                    <FormControlLabel  control={<MuiCheckbox />} label="NIPL" />
                    <FormControlLabel  control={<MuiCheckbox />} label="NPCL" />
                  </FormGroup>
                </div>
              </div>
              <div className="setting_session_flex">
                <div className="keywords_box">
                  <h5
                    className="import_story_text"
                    style={{ marginTop: "0.5rem", width: "17%" }}
                  >
                    Keywords
                  </h5>
                 <Text type="input" style={{ width: "40%", marginLeft: "0.0rem" }}/>
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
    context: state.context,
    userRequirement: state.requirement,
    requirementResponse: state.requirementResponse,
    uploadedRequirementFile: state.uploadedRequirementFile,
    loading: state.loading,
  };
};

const mapDispatchToProps = {
  startLoading,
  stopLoading,
  uploadedRequirementFile,
};

export default connect(mapStateToProps, mapDispatchToProps)(Requirement);
