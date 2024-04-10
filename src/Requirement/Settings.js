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
    <div>
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
                  style={{ marginTop: "0.5rem", width: "40.5%" }}
                >
                  Industry
                </h5>
                <select
                  name="industry"
                  // value={formData.compliance}
                  onChange={handleChange}
                  id="cars"
                  style={{ width: "29.4%" }}
                  className="compilance_select"
                >
                  <option>Select</option>
                  <option value="BFSI">BFSI</option>
                </select>
              </div>
                <div className="keywords_box">
                  <h5
                    className="import_story_text"
                    style={{ marginTop: "0.5rem" }}
                  >
                    Domain
                  </h5>
                  <select
                    name="domain"
                    // value={setting.industry}
                    onChange={handleChange}
                    id="cars"
                    style={{ width: "65%", marginLeft: "4%" }}
                  >
                    <option>Select</option>
                    <option value="Banking">Banking</option>
                    <option value="Insurance">Insurance</option>
                    <option value="CapitalMarkets">Capital Markets</option>
                    <option value="OtherFinancialServices">Other Financial Services</option>                    
                  </select>
                </div>
                </div>
                <div className="setting_session_flex">
                <div className="keywords_box">
                  <h5
                    className="import_story_text"
                    style={{ marginTop: "0.5rem", width: "46%" }}
                  >
                    Sub Domain
                  </h5>
                  <select
                    name="domain"                  
                    onChange={handleChange}
                    id="cars"
                    style={{ width: "65%", marginLeft: "0.3rem" }}
                  >
                    <option>Select</option>
                    <option value="Retail Banking">Retail Banking</option>
                    <option value="Commercial Banking">Commercial Banking</option>
                    <option value="Investment Banking">Investment Banking</option>
                    <option value="Private Banking">Private Banking</option>
                    <option value="Asset Management">Asset Management</option>
                    <option value="Wealth Management">Wealth Management</option>
                    <option value="Corporate Banking">Corporate Banking</option>
                    <option value="Treasury Services">Treasury Services</option>
                    <option value="Risk Management">Risk Management</option>
                    <option value="Technology and Innovation">Technology and Innovation</option>
                    <option value="Regulatory Compliance">Regulatory Compliance</option>
                    <option value="Credit and Lending">Credit and Lending</option>
                    <option value="Mortgage Services">Mortgage Services</option>
                    <option value="Payment Processing">Payment Processing</option>
                    <option value="Customer Service and Support">Customer Service and Support</option>
                    <option value="Financial Planning and Advisory">Financial Planning and Advisory</option>
                    <option value="Capital Markets">Capital Markets</option>
                    <option value="Insurance Services (for banks offering insurance products)">Insurance Services (for banks offering insurance products)</option>
                    <option value="Foreign Exchange Services">Foreign Exchange Services</option>
                    <option value="Trade Finance">Trade Finance</option>                    
                  </select>
                </div>
               
                <div className="keywords_box">
                  <h5
                    className="import_story_text"
                    style={{ marginTop: "0.5rem" }}
                  >
                    Core Area
                  </h5>
                  <select
                    name="corearea"
                    value={setting.corearea}
                    onChange={handleChange}
                    id="cars"
                    style={{ width: "65%", marginLeft: "0.3rem" }}
                  >
                    <option>Select</option>
                    <option value="CapitalMarkets">Capital Markets</option>
                    <option value="DepositAccounts">Deposit Accounts</option>
                    <option value="ConsumerLoans">Consumer Loans</option>
                    <option value="CreditCards">Credit Cards</option>
                    <option value="Mortgages">Mortgages</option>
                    <option value="DebitCards">Debit Cards</option>
                    <option value="OnlineandMobileBanking">Online and Mobile Banking</option>
                    <option value="ATMServices">ATM Services</option>
                    <option value="BranchBanking">Branch Banking</option>
                    <option value="CustomerServiceandSupport">Customer Service and Support</option>
                    <option value="FinancialEducationandCounseling">Financial Education and Counseling</option>
                    <option value="OverdraftProtection">Overdraft Protection</option>
                    <option value="FraudPreventionandSecurity">Fraud Prevention and Security</option>
                    <option value="RewardsandLoyaltyPrograms">Rewards and Loyalty Programs</option>
                    <option value="ForeignCurrencyServices">Foreign Currency Services</option>
                    <option value="SmallBusinessBanking">Small Business Banking</option>
                  </select>
                </div>
                </div>
                <div className="setting_session_flex">
                <div className="keywords_box">
                  <h5
                    className="import_story_text"
                    style={{ marginTop: "0.5rem", width: "18%" }}
                  >
                    Applicable Compliance
                  </h5>
                  <select
                    name="compliance"
                    value={setting.compliance}
                    onChange={handleChange}
                    id="cars"
                    style={{ width: "26%", marginLeft: "0.3rem" }}
                  >
                    <option>Select</option>
                    <option>ISO 27001</option>
                    </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
