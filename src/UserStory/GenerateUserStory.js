import React, { useState, useEffect, useContext } from "react";
import "./userStory.css";
import { connect, useDispatch, useSelector } from "react-redux";
import fetchData, { fetchFileUserStoryData } from "./userStoryServices";
import { startLoading, stopLoading } from "../reduxStore/actions";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { Globalcontext } from "../App";

const UserStory = ({ startLoading, stopLoading, userStoryData }) => {
  let { file } = useContext(Globalcontext);

  const [requirementinfo, setrequirementinfo] = useState(false);
  const [userStoryData1, setUserStoryData1] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const userStorySetting = useSelector((state) => state.userStorySetting);

  useEffect(() => {
    setIsLoading(true);
    if (file) {
      fetchFileUserStoryData(file, userStoryData, dispatch, userStorySetting) // Updated the parameter to use the value from the textarea
        .then((data) => {
          setUserStoryData1(data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      dispatch(startLoading());
      fetchData(userStoryData, dispatch, userStorySetting)
        .then((data) => {
          setUserStoryData1(data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [dispatch, file, startLoading, userStoryData,userStorySetting]);

  return (
    <>
    {isLoading && <div className="overlay"></div>}
    {isLoading && <div className="loader"></div>}
      <div className="container">
        <div className="row gx-0">
          <div className="col-12 story-column">
            <div className="story-column-last">
              <div className="text_circle_box" style={{ marginTop: "1rem" }}>
                <h5 className="import_story_text">
                  Requirement Generated User Stories
                </h5>
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
              <textarea
                rows={10}
                style={{ width: "100%" }}
                value={userStoryData}
              ></textarea>
            </div>
            <div className="button_container">
              <button>Download</button>
              {/* <button onClick={handleConfirm}>Confirm</button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.requirementResponse,
    userStoryData: state.userstoryResponse,
    loading: state.loading,
  };
};

const mapDispatchToProps = {
  startLoading,
  stopLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserStory);
