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
                  ></textarea>
                </div>
              </div>
              <div className="button_container">
                <button>Download</button>
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
