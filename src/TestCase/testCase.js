import React, { useState, useContext } from "react";
import "./testcase.css";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { connect, useDispatch, useSelector } from "react-redux";
import { Globalcontext } from "../App";
import testCasefetchData, {testCasefetchFileData} from "./testCaseServices";
import {
  uploadedTestCasesFile
} from "../reduxStore/actions";
import Button from "@mui/material/Button";

const TestCase = () => {
  const [selectedOption, setSelectedOption] = useState("From User Story");
  const [testCasesData, setTestCasesData] = useState([]);
  const [testinfo, settestinfo] = useState(false);
  const [generatedinfo, setgeneratedinfo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const testCasesFile = useSelector((state) => state.uploadedTestCasesFile);
  let { getfile, file } = useContext(Globalcontext);
  const userStoryData = useSelector((state) => state.userstoryResponseForTestCases);
  const testCasesResponse = useSelector((state) => state.testCasesResponse);
  const dispatch = useDispatch();
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleGenerateTC = (event) => {
    if(event.target.value) 
      {
    setIsLoading(true);
    if(selectedOption === "From User Story") {
    testCasefetchData(userStoryData) // Updated the parameter to use the value from the textarea
      .then((data) => {
        console.log(data);
        setTestCasesData(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
    }
    else {
      console.log(file);
      testCasefetchFileData(file, dispatch) // Updated the parameter to use the value from the textarea
      .then((data) => {
        setTestCasesData(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
    }
  }
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
    dispatch(uploadedTestCasesFile(file));
  };

const renderTable = (tableData) => {
  if (tableData?.length === 0) return null; // Handle empty tables

  const headers = Object.keys(tableData[0]);
  return (
    <table border="1" cellPadding="5">
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData?.map((row) => (
          <tr key={row.TestCaseID}>
            {/* Wrap first cell in anchor tag */}
            <td key={`first-cell-${row.TestCaseID}`}>
              <a href="#" target="_blank" rel="noopener noreferrer">
                {row[headers[0]]}
              </a>
            </td>
            {/* No need to iterate through headers for other columns */}
            {/* Rest of the cells can be rendered normally */}
            {headers.slice(1).map((header) => (
              <td key={`${row.TestCaseID}-${header}`}>
                {Array.isArray(row[header]) ? (
                  <ul>
                    {row[header].map((item, index) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  row[header]
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

  return (
    <>
     {isLoading && <div className="overlay"></div>}
    {isLoading && <div className="loader"></div>}
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
                  File 
                </h6>
              </div>
             { selectedOption === "File Upload" && <div>
                <input
                  type="file"
                  id="upload_label"
                  onChange={handleFileUpload}
                />
                {testCasesFile ? testCasesFile.name : ""}
              </div>}
              <br/>
            </div>
            <div style={{height:'30px'}}></div>
              <div className="button_container">
            <Button variant="text" onClick={handleGenerateTC}>Generate TestCases</Button>
            </div> 
            <div
              className="upload_textarea_requirement"
              style={{ width: "100%" }}
            >
              <div className="text_circle_box">
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
            </div>           
            <div
              className="testcase_container_button"
              style={{ width: "100%", marginTop: "1rem", display: 'none' }}
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
            <div style={{ marginTop: "0.8rem" }}>
              {testCasesResponse?.length > 0 && testCasesResponse.map((table, index) => (
                <div 
                  key={index} 
                  style={{ 
                    fontSize: '0.8em', 
                    width: '100%', 
                    margin: 'auto' 
                  }}
                >           
                  {table?.length > 0 
                    &&  <h2>Test Cases for Requirement: <span style={{fontSize: 'Medium'}}>{table[0]?.Requirement} </span> </h2> } 
                  {table?.length > 0 && renderTable(table)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default TestCase;
