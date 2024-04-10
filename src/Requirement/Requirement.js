import React, { useState, useEffect, useContext } from "react";
import "./requirement.css";
import {
  requirement,
  startLoading,
  stopLoading,
  uploadedRequirementFile,
} from "../reduxStore/actions";
import { connect, useDispatch, useSelector } from "react-redux";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { Globalcontext } from "../App";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

const Requirement = ({ uploadedRequirementFile }) => {
  let { getfile } = useContext(Globalcontext);

  const [selectedOption, setSelectedOption] = useState("Text");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const [requirementinfo, setrequirementinfo] = useState(false);
  const [uploadinfo, setuploadinfo] = useState(false);
  const userRequirement = useSelector((state) => state.requirement);
  const requirementFile = useSelector((state) => state.uploadedRequirementFile);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (requirementFile) {
      setSelectedOption("File Upload");
    } else {
      setSelectedOption("Text");
    }
  }, [requirementFile]);

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);

    if (event.target.value === "File Upload") {
      dispatch(requirement(""));
    } else {
      //dispatch(uploadedRequirementFile(null));
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    getfile(file);

    setSelectedFile(file);
    if (file && (file.name.endsWith(".doc") || file.name.endsWith(".docx"))) {
      dispatch(requirement(""));
      alert("File uploaded successfully");
    } else {
      alert("Please select a valid .doc file.");
      return false;
    }
    // dispatch(uploadedRequirementFile(file));
  };

  return (
   
    <div>
      <div className="container">
        <div className="row gx-0">
          <div className="col-12 requirement">
            <div>
              <div className="text-container">
                <div className="text-container-1">
                  <input
                    type="radio"
                    value="Text"
                    checked={selectedOption === "Text"}
                    onChange={handleRadioChange}
                    style={{ transform: "scale(1.3)", accentColor: "black" }}
                  />
                  <h6
                    style={{
                      fontSize: "1rem",
                      color: "rgba(0, 0, 0, 0.5)",
                      fontWeight: 600,
                      marginTop: "0.5rem",
                    }}
                  >
                    Text
                  </h6>
                </div>
                <div className="text-container-2">
                  <input
                    type="radio"
                    value="File Upload"
                    checked={selectedOption === "File Upload"}
                    onChange={handleRadioChange}
                    style={{ transform: "scale(1.3)", accentColor: "black" }}
                  />
                  <h6
                    style={{
                      fontSize: "1rem",
                      color: "rgba(0, 0, 0, 0.5)",
                      fontWeight: 600,
                      marginTop: "0.5rem",
                    }}
                  >
                    File Upload
                  </h6>
                </div>
              </div>
              {isLoading && <div className="overlay"></div>}
              {isLoading && <div className="loader"></div>}
            </div>
            {selectedOption === "Text" && (
              <div
                className="requirement_session"
                style={{
                  marginTop: "1.2rem",
                  width: "93.8%",
                  padding: 0,
                }}
              >
                <div className="text_circle_box">
                  <h5 className="import_story_text">Requirement</h5>
                  <Tippy content="jep" visible={requirementinfo}>
                    <i
                      className="uil uil-info-circle"
                      onClick={() => {
                        setrequirementinfo(!requirementinfo);
                        setTimeout(() => {
                          setrequirementinfo(false);
                        }, 2200);
                      }}
                    ></i>
                  </Tippy>
                </div>
                <div style={{ width: "100%" }}>
                  <textarea
                    className="requirement-textarea"
                    rows="4"
                    style={{ width: "100%", maxWidth: "100%" }}
                    value={userRequirement}
                    onChange={(event) => {
                      dispatch(requirement(event.target.value));
                    }}
                  ></textarea>
                </div>
              </div>
            )}
            {selectedOption === "File Upload" && (
              <div className="upload_textarea_requirement">
                <div className="text_circle_box">
                  <h5 className="import_story_text">File Upload</h5>
                  <Tippy content="jep" visible={uploadinfo}>
                    <i
                      className="uil uil-info-circle"
                      onClick={() => {
                        setuploadinfo(!uploadinfo);
                        setTimeout(() => {
                          setuploadinfo(false);
                        }, 2200);
                      }}
                    ></i>
                  </Tippy>
                </div>
                <div
                  className="requirement-upload_box"
                  style={{ paddingLeft: "1.5%" }}
                >
                  <input
                    type="file"
                    id="upload_label"
                    onChange={handleFileUpload}
                    label="File Upload"
                  />
                  {requirementFile ? requirementFile.name : ""}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    // </MDBox>
  );
};

const mapStateToProps = (state) => {
  return {
    context: state.context,
    userRequirement: state.requirement,
    requirementResponse: state.requirementResponse,
    requirementFile: state.uploadedRequirementFile,
    loading: state.loading,
  };
};

const mapDispatchToProps = {
  startLoading,
  stopLoading,
  uploadedRequirementFile,
};

export default connect(mapStateToProps, mapDispatchToProps)(Requirement);
