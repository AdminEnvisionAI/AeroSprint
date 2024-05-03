import React, { useState, useEffect } from "react";
import "./testcase.css";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { connect, useDispatch, useSelector } from "react-redux";
import testCasefetchData from "./testCaseServices";
import GridLayout from 'react-grid-layout';

function TestCase() {
  const [selectedOption, setSelectedOption] = useState("From User Story");
  const [testCasesData, setTestCasesData] = useState([]);
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

  const renderHeader = (tableData) => {
    if (tableData?.length === 0) return null; // Handle empty tables

    const headers = Object.keys(tableData[0]);
    return (
      <>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        </table>
        </>
        )
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
          {tableData.map((row) => (
            <tr key={row.TestCaseID}>
              {headers.map((header) => (
                <td key={`${row.TestCaseID}-${header}`}>
                  {Array.isArray(row[header]) ? (
                    <ul>
                      {row[header].map((item) => (
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
              {testCasesData?.length > 0 && testCasesData.map((table, index) => (
                  <div 
                  key={index} 
                  style={{ 
                    fontSize: '0.8em', 
                    width: '100%', 
                    margin: 'auto' 
                  }}
                >                  
                {table.length > 0 
                &&  <h2>Test Cases for US: {index + 1} </h2> }
                {table.length > 0 && renderTable(table)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestCase;
