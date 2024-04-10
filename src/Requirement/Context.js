/* eslint-disable */
import React, { useState } from "react";
import "./requirement.css";
import {
  startLoading,
  stopLoading,
  contextData,
} from "../reduxStore/actions";
import { connect, useDispatch, useSelector } from "react-redux";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const Requirement = ({ startLoading, stopLoading }) => {
  const dispatch = useDispatch();
  const [contextinfo, setcontextinfo] = useState(false);
  const context = useSelector((state) => state.context);

  return (
    <>
      <div className="container">
        <div className="row gx-0">
          <div className="col-12 requirement">
            <div className="context-container ">
              <div className="text_circle_box">
                <h5 className="import_story_text">Context</h5>
                <Tippy content="jep" visible={contextinfo}>
                  <i
                    className="uil uil-info-circle"
                    onClick={() => {
                      setcontextinfo(!contextinfo);
                      setTimeout(() => {
                        setcontextinfo(false);
                      }, 2200);
                    }}
                  ></i>
                </Tippy>
              </div>
              <div className="context-area">
                <textarea
                  cols="90"
                  rows="3"
                  className="context-textarea"
                  value={context}
                  onChange={(event) => {
                    dispatch(contextData(event.target.value));
                  }}
                ></textarea>
              </div>
            </div>
          </div>
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
