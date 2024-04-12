import React, { useState, useEffect, useContext } from "react";
import "./requirement.css";
import {
  startLoading,
  stopLoading,
} from "../reduxStore/actions";
import { connect, useDispatch, useSelector } from "react-redux";
import fetchRequirementData, {
  fetchFileRequirementData,
} from "./requirementServices";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { Globalcontext } from "../App";
import Button from "@mui/material/Button";

const Requirement = ({ startLoading, stopLoading }) => {
  let { file } = useContext(Globalcontext);
  const [isLoading, setIsLoading] = useState(false);
  const [requirementDatadgr, setRequirementDatadgr] = useState("");

  const dispatch = useDispatch();
  const [documentinfo, setdocumentinfo] = useState(false);
  const context = useSelector((state) => state.context);
  const setting = useSelector((state) => state.setting);

  const userRequirement = useSelector((state) => state.requirement);
  const requirementResponse = useSelector((state) => state.requirementResponse);

  const handleDownload = () => {
    try{
    if (requirementResponse) {
      const blob = new Blob([requirementResponse], { type: 'application/msword' }); // Change MIME type for .docx
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'BRD.docx'; // Change file name for .docx
      document.body.appendChild(a);
      // Check if the browser is Safari on iOS
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      if (isIOS) {
        // Open the URL in a new tab for iOS Safari
        window.open(url, '_blank');
      } else {
        // Trigger download for other browsers
        a.click();
      }
      URL.revokeObjectURL(url);
    } else {
      alert("No data to download");
    }
  } catch (error) {
    console.error("An error occurred during the download process: ", error);
  }
  }

  useEffect(() => {
    setIsLoading(true);
    if (userRequirement) {
      fetchRequirementData(userRequirement, context, dispatch, setting) // Updated the parameter to use the value from the textarea
        .then((data) => {
          setRequirementDatadgr(data);
          setIsLoading(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      fetchFileRequirementData(file, context, dispatch, setting) // Updated the parameter to use the value from the textarea
        .then((data) => {
          setRequirementDatadgr(data);
          setIsLoading(false);
        })
        .finally(() => {
          dispatch(stopLoading());
          setIsLoading(false);
        });
    }
  }, [
    dispatch,
    userRequirement,
    file,
    setting,
  ]);

  return (
    <>
      {isLoading && <div className="overlay"></div>}
      {isLoading && <div className="loader"></div>}
      <div className="container">
        <div className="row gx-0">
          {/* {(requirementResponse || requirementDatadgr) && ( */}
            <>
              <div className="document-generated-text">
                <div className="text_circle_box" style={{ marginTop: 0 }}>
                  <h5 className="import_story_text">
                    Document Generated Requirements
                  </h5>
                  <Tippy content="jep" visible={documentinfo}>
                    <i
                      className="uil uil-info-circle"
                      onClick={() => {
                        setdocumentinfo(!documentinfo);
                        setTimeout(() => {
                          setdocumentinfo(false);
                        }, 2200);
                      }}
                    ></i>
                  </Tippy>
                </div>
                <div style={{ marginTop: "0.4rem" }} className="dgr-area">
                  <textarea
                    className="dgr-textarea"
                    rows="8"
                    style={{ width: "100%", maxWidth: "100%" }}
                    value={requirementResponse}
                    onChange={()=>{}}
                  ></textarea>
                </div>
              </div>
              <div className="button_container">
              <Button variant="text" onClick={handleDownload}>Download</Button>                
              </div>
            </>
          {/* )} */}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    context: state.context,
    userRequirement: state.requirement,
    requirementResponse: state.requirementResponse,
    loading: state.loading,
  };
};

const mapDispatchToProps = {
  startLoading,
  stopLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(Requirement);
