import React, { useState, useEffect } from "react";
import "./testcase.css";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { connect, useDispatch, useSelector } from "react-redux";
import testCasefetchData from "./testCaseServices";

function TestCase() {
  const [selectedOption, setSelectedOption] = useState("From User Story");
  const [testCasesData, setTestCasesData] = useState('');
  const [testinfo, settestinfo] = useState(false);
  const [settinginfo, setsettinginfo] = useState(false);
  const [generatedinfo, setgeneratedinfo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    setIsLoading(true);
      testCasefetchData() // Updated the parameter to use the value from the textarea
        .then((data) => {
          setTestCasesData(data);
          // setUserStoryData1(data);
        })
        .finally(() => {
          setIsLoading(false);
        });   
  }, [dispatch]); 

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.name.endsWith(".doc")) {
      alert("File uploaded successfully");
    } else {
      alert("Please select a valid .doc file.");
    }
  };

  return (
  
    <div>
      <div className="container">
        <div className="row gx-0">
          <div className="col-12 testcase-column">
           
          
              <div className="radio-main-box">
                <div className="radio_subbox_requirment">
                  <input
                    value="From User Story"
                    checked={selectedOption === "From User Story"}
                    onChange={handleRadioChange}
                    type="radio"
                    style={{ transform: "scale(1.3)", accentColor: "black" }}
                  ></input>
                  <h6
                    style={{
                      fontSize: "1rem",
                      color: "rgba(0, 0, 0, 0.5)",
                      fontWeight: 600,
                      marginTop: "0.5rem",
                    }}
                  >
                    From User Story
                  </h6>
                </div>
                <div className="radio_subbox_requirment">
                  <input
                    type="radio"
                    value="File Upload"
                    checked={selectedOption === "File Upload"}
                    onChange={handleRadioChange}
                    style={{ transform: "scale(1.3)", accentColor: "black" }}
                  ></input>
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
            
            <div
              className="upload_textarea_requirement"
              style={{ width: "100%" }}
            >
              <div className="text_circle_box">
                <h5 className="import_story_text">Test Cases</h5>
                <Tippy content="jep" visible={testinfo}>
                  <i
                    className="uil uil-info-circle"
                    onClick={() => {
                      settestinfo(!testinfo);
                      setTimeout(() => {
                        settestinfo(false);
                      }, 2200);
                    }}
                  ></i>
                </Tippy>
              </div>
              {/* <textarea rows={2} style={{ width: "60%" }}></textarea> */}
              {/* <div className="upload_box" style={{ marginTop: "0.2rem" }}>
                {/* <label htmlFor="upload_label">
                  <i
                    class="uil uil-upload"
                    style={{
                      color: "gray",
                      fontSize: "1.1rem",
                      marginLeft: "0.4rem",
                    }}
                  ></i>{" "}
                  Upload
                </label>
                <input
                  type="file"
                  id="upload_label"
                  hidden
                  onChange={handleFileUpload}
                /> 
              </div> */}
            </div>
            {/* <div className="setting_session" style={{ width: "100%" }}>
              <div className="setting_session_flex">
                <div className="keywords_box">
                  <h5
                    className="import_story_text"
                    style={{ marginTop: "0.5rem" }}
                  >
                    Keywords
                  </h5>
                  <input type="text" style={{ width: "30%" }}></input>
                </div>
              </div>
              <div className="keywords_box">
                <h5
                  className="import_story_text"
                  style={{ marginTop: "0.5rem" }}
                >
                  Number
                </h5>
                <input
                  type="number"
                  style={{ width: "30%", marginLeft: "0.8rem" }}
                ></input>
              </div> 
            </div>*/}
            <div
              className="testcase_container_button"
              style={{ width: "100%", marginTop: "1rem",  display:'none' }}
            >
              <div className="text_circle_box">
                <h5 className="import_story_text">Generated Test Cases</h5>
                <Tippy content="jep" visible={generatedinfo}>
                  <i
                    className="uil uil-info-circle"
                    onClick={() => {
                      setgeneratedinfo(!generatedinfo);
                      setTimeout(() => {
                        setgeneratedinfo(false);
                      }, 2200);
                    }}
                  ></i>
                </Tippy>
              </div>
            </div>
            <div style={{ marginTop: "0.8rem"}}>
              {/* <table style={{ borderCollapse: "collapse", width: "100%" }}>
                <tbody>
                  {[...Array(4)].map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {[...Array(4)].map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          style={{
                            border: "1px solid rgba(0, 0, 0, 0.4)",
                            padding: "13px",
                            textAlign: "center",
                          }}
                        ></td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table> */}
             {testCasesData && <textarea value={testCasesData} rows={15} style={{ width: "100%" }}></textarea>}
            </div>
            {/* <div className="button_container" style={{ width: "100%" }}>
              <button className="ps-4 pe-4">Download</button>
              <button className="ps-4 pe-4">Confirm</button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
    // </DashboardLayout>
  );
}

export default TestCase;
