/* eslint-disable */
import React, { useState, useEffect, useContext } from "react";
import "./userStory.css";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  startLoading,
  stopLoading,
  uploadedUserstoryFile,
} from "../reduxStore/actions";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { Globalcontext } from "../App";

const UserStory = ({ startLoading, uploadedUserstoryFile, data }) => {
  let { getfile } = useContext(Globalcontext);

  const [storyinfo, setstoryinfo] = useState(false);
  const [selectedOption, setSelectedOption] = useState("File");
  const userstoryFile = useSelector((state) => state.uploadedUserstoryFile);
  const userRequirementResp = useSelector((state) => state.requirementResponse);

  const dispatch = useDispatch();

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    getfile(file);

    if (file && (file.name.endsWith(".doc") || file.name.endsWith(".docx"))) {
      alert("File uploaded successfully");
    } else {
      alert("Please select a valid .doc file.");
      return false;
    }
    dispatch(uploadedUserstoryFile(file));
  };

  return (
    <div>
      <div className="container">
        <div className="row gx-0">
          <div className="col-12 story-column">
            <div className="story-column-1">
              <div className="text_circle_box">
                <h5 className="import_story_text">Import User Story</h5>
                <Tippy content="jep" visible={storyinfo}>
                  <i
                    className="uil uil-info-circle"
                    onClick={() => {
                      setstoryinfo(!storyinfo);
                      setTimeout(() => {
                        setstoryinfo(false);
                      }, 2200);
                    }}
                  ></i>
                </Tippy>
              </div>
            </div>
            {/* <div className="story-column-2">            
              <div className="radio_subbox" style={{'width': '100%'}}>
                <input
                  type="radio"
                  style={{ transform: "scale(1.3)", accentColor: "black" }}
                  value=""
                  checked={selectedOption === "" ? true : false}
                  onChange={handleRadioChange}
                ></input>
                <h6
                  style={{
                    fontSize: "1.2rem",
                    color: "gray",
                    fontWeight: 500,
                    marginTop: "0.3rem",
                  }}
                >
                  Choose Generated Requirement - Previous STEP
                </h6>
              </div>
            </div> */}
            <div className="story-column-2">            
              <div className="radio_subbox">
                <input
                  type="radio"
                  style={{ transform: "scale(1.3)", accentColor: "black" }}
                  value="File"
                  checked={selectedOption === "File" ? true : false}
                  onChange={handleRadioChange}
                ></input>
                <h6
                  style={{
                    fontSize: "1.2rem",
                    color: "gray",
                    fontWeight: 500,
                    marginTop: "0.3rem",
                  }}
                >
                  File
                </h6>
              </div>
              <div className="upload_box">
                <input
                  type="file"
                  id="upload_label"
                  onChange={handleFileUpload}
                />
                {userstoryFile ? userstoryFile.name : ""}
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
    data: state.requirementResponse,
    userstoryFile: state.uploadedUserstoryFile,
    loading: state.loading,
  };
};

const mapDispatchToProps = {
  startLoading,
  stopLoading,
  uploadedUserstoryFile,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserStory);
