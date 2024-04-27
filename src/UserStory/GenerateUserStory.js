import React, { useState, useEffect, useContext } from "react";
import "./userStory.css";
import { connect, useDispatch, useSelector } from "react-redux";
import fetchData, { fetchFileUserStoryData, fetchUserStoryFromFilePath } from "./userStoryServices";
import { startLoading, stopLoading } from "../reduxStore/actions";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { Globalcontext } from "../App";
import Button from "@mui/material/Button";

const UserStory = ({ startLoading, stopLoading }) => {
  let { file } = useContext(Globalcontext);

  const [requirementinfo, setrequirementinfo] = useState(false);
  const [userStoryData1, setUserStoryData1] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const userStorySetting = useSelector((state) => state.userStorySetting);
  const requirementResponseResp = useSelector((state) => state.requirementResponse);
  const userStoryData = useSelector((state) => state.userStoryData);

  // const handleDownload = () => {
  //   if (userStoryData) {
  //     const blob = new Blob([userStoryData], { type: 'application/msword' }); // Change MIME type for .docx
  //     const url = URL.createObjectURL(blob);
  //     const a = document.createElement('a');
  //     a.href = url;
  //     a.download = 'UserStory.docx'; // Change file name for .docx
  //     document.body.appendChild(a);
  //     a.click();
  //     URL.revokeObjectURL(url);
  //   }
  //   else {
  //     alert("No data to download");
  //   }
  // }

  const handleDownload = () => {
    try{
    if (userStoryData) {
      const blob = new Blob([userStoryData], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }); // Change MIME type for .docx
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'UserStory.docx'; // Change file name for .docx
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
    if (!file) {
      alert("Please Select Requirement File");
      setIsLoading(false);
    }
    else if (file) {
      fetchUserStoryFromFilePath(file, userStoryData, dispatch, userStorySetting) // Updated the parameter to use the value from the textarea
        .then((data) => {
          setUserStoryData1(data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else if (requirementResponseResp){
      fetchData(requirementResponseResp, dispatch, userStorySetting)
        .then((data) => {
          setUserStoryData1(data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [dispatch, file, requirementResponseResp]); 

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
                onChange={()=>{}}
              ></textarea>
            </div>
            <div className="button_container">
            <Button variant="text" onClick={handleDownload}>Download</Button>
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
