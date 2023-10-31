import React, { useCallback, useState, useEffect } from "react";
import Select, { components } from "react-select";
import { addUpdateEmp, fetchSkills } from "../../services/RMPortalServices";
import "./Employee.css";

const ClearIndicator = (props) => {
  return (
    <components.ClearIndicator {...props}>
      <button className="clearAllButton" onClick={props.clearValue}>
        Clear All
      </button>
    </components.ClearIndicator>
  );
};

function AddAnEmployee({
  employeeData,
  onCloseClickHandler,
  onSaveClickHandler,
  fetchData,
}) {
  const [skillJson, setSkillJson] = useState([]);

  useEffect(() => {
    const fetchSkillsData = async () => {
      const skillsJson = await fetchSkills();
      setSkillJson(skillsJson);
    };

    fetchSkillsData();
  }, []);

  // const employeeData = data ? || null;
  const [emailId, setEmailId] = useState(
    employeeData ? employeeData.employeeEmailId : ""
  );
  const [employeeId, setEmployeeId] = useState(
    employeeData ? employeeData.employeeId : ""
  );
  const [name, setName] = useState(
    employeeData ? employeeData.employeeName : ""
  );
  const [localGrade, setLocalGrade] = useState(
    employeeData ? employeeData.employeeGrade : ""
  );
  const [workLocation, setWorkLocation] = useState(
    employeeData ? employeeData.employeeWorkLocation : ""
  );
  const [baseLocation, setBaseLocation] = useState(
    employeeData ? employeeData.employeeBaseLocation : ""
  );
  const [selectedSkills, setSelectedSkills] = useState([]);

  const [error, setError] = useState("");
  const [sucessMsg, setSucessMsg] = useState("");

  useEffect(() => {
    const a = [];
    if (employeeData) {
      employeeData.empSkills.forEach((skillId) =>
        skillJson.forEach((skills) => {
          if (skills.id === skillId) {
            a.push({
              value: skills.skill,
              label: skills.skill,
              id: skills.id,
            });
          }
        })
      );
    }
    setSelectedSkills(a);
  }, [employeeData, skillJson]);

  const optionHandler = () => {
    if (selectedSkills.length) {
      const inputLower = selectedSkills.map((value) =>
        value.label.toLowerCase().trim()
      );
      return skillJson
        .filter((value) =>
          inputLower.map((item) => value.skill.toLowerCase().includes(item))
        )
        .map((value) => ({
          value: value.skill,
          label: value.skill,
          id: value.id,
        }));
    } else {
      if (skillJson.length) {
        return skillJson.map((value) => ({
          value: value.skill,
          label: value.skill,
          id: value.id,
        }));
      } else {
        return [];
      }
    }
  };

  const onEmailIdHanlder = (event) => {
    //Employee Id handler
    setEmailId(event.target.value);
  };

  const onEmployeeIDhandler = (event) => {
    //Employee Id handler
    setEmployeeId(event.target.value);
  };

  const onNameHandler = (event) => {
    //Name handler
    setName(event.target.value);
  };

  const onLGHandler = (event) => {
    //Local Grade handler
    setLocalGrade(event.target.value);
  };

  const onWLHandler = (event) => {
    //Work Location handler
    setWorkLocation(event.target.value);
  };

  const onBLHandler = (event) => {
    //Base Location handler
    setBaseLocation(event.target.value);
  };

  const handleOptionChange = (selectedOption) => {
    setSelectedSkills(selectedOption);
  };

  const onFormHandler = useCallback(
    async (e) => {
      e.preventDefault();

      if (
        emailId !== "" &&
        employeeId !== "" &&
        name !== "" &&
        localGrade !== "" &&
        workLocation !== "" &&
        baseLocation !== ""
        // selectedSkills.length !== []
      ) {
        const selectedSkillIds = [];
        skillJson.forEach((value) =>
          selectedSkills.some(
            (item) => item.id === value.id && selectedSkillIds.push(item.id)
          )
        );

        // Create the Form data object to send to the API
        const formData = {
          employeeId: employeeId,
          employeeEmailId: emailId,
          employeeName: name,
          employeeGrade: localGrade,
          employeeBaseLocation: baseLocation,
          employeeWorkLocation: workLocation,
          empSkills: selectedSkillIds,
        };

        const method = employeeData ? "PUT" : "POST";

        setName("");
        setLocalGrade("");
        setBaseLocation("");
        setWorkLocation("");
        setEmailId("");
        setEmployeeId("");
        setSelectedSkills([]);

        try {
          const response = await addUpdateEmp({ method, formData });
          if (response.status) {
            method === "PUT" && fetchData();
            setError("");
            //clear the input fields
            setSucessMsg("Data added sucessfully");
            employeeData && onCloseClickHandler();
            setError("");
          } else {
            setSucessMsg("");
            setError("Check your credentials again");
          }
        } catch (error) {
          console.error("API Error:", error.message);
          setError("Failed to submit data to the data. Please try again");
          setSucessMsg("");
        }
      } else {
        setError("Invalid data, please fill all the details.");
        setSucessMsg("");
      }
    },
    [
      skillJson,
      selectedSkills,
      name,
      baseLocation,
      workLocation,
      localGrade,
      emailId,
      employeeId,
      employeeData,
      onCloseClickHandler,
      fetchData,
    ]
  );

  const onCloseClick = () => {
    onCloseClickHandler();
  };

  const onClickOnSave = () => {
    onSaveClickHandler();
    // onCloseClickHandler();
  };

  return (
    <div className={employeeData ? "popup" : "addEmployeeContainer"}>
      <div
        className={
          employeeData
            ? "popup-content editContainer editPopUpContent"
            : "formContainer"
        }
      >
        {employeeData ? (
          <div className="editHeadingContainer">
            <p className="editHeadingText">Edit Employee Details</p>
            <button className="closeButton" onClick={onCloseClick}>
              <img src="/RMtoolSVGs/close.svg" alt="close" />
            </button>
          </div>
        ) : null}
        <p className="error">{error}</p>
        <p className="sucess">{sucessMsg}</p>
        <form autoComplete="off" onSubmit={onFormHandler}>
          <div className={employeeData ? null : "addItems"}>
            <div className="editItems">
              <label>Name* :</label>
              <input
                className={employeeData ? "editBGColor inputAdd" : "inputAdd"}
                type="text"
                placeholder="Enter Employee Name"
                value={name}
                onChange={onNameHandler}
              />
            </div>
            <div className="editItems">
              <label>Employee Id* :</label>
              <input
                className={employeeData ? "editBGColor inputAdd" : "inputAdd"}
                type="text"
                placeholder="Enter Capgemini Email ID"
                value={employeeId}
                onChange={onEmployeeIDhandler}
              />
            </div>
          </div>
          <div className={employeeData ? null : "addItems"}>
            <div className="editItems">
              <label>Email Id* :</label>
              <input
                className={employeeData ? "editBGColor inputAdd" : "inputAdd"}
                type="email"
                placeholder="Enter Employee ID"
                value={emailId}
                onChange={onEmailIdHanlder}
              />
            </div>
            <div className="editItems">
              <label>Local Grade* :</label>
              <input
                className={employeeData ? "editBGColor inputAdd" : "inputAdd"}
                type="text"
                placeholder="Enter Employee Grade"
                value={localGrade}
                onChange={onLGHandler}
              />
            </div>
          </div>
          <div className={employeeData ? null : "addItems"}>
            <div className="editItems">
              <label>Work Location*</label>
              <input
                className={employeeData ? "editBGColor inputAdd" : "inputAdd"}
                type="text"
                placeholder="Enter Employee Working Location"
                value={workLocation}
                onChange={onWLHandler}
              />
            </div>
            <div className="editItems">
              <label>Base Location*</label>
              <input
                className={employeeData ? "editBGColor inputAdd" : "inputAdd"}
                type="text"
                placeholder="Enter Employee Base Location"
                value={baseLocation}
                onChange={onBLHandler}
              />
            </div>
          </div>
          <div className="editItems">
            <label>Skills*:</label>
            <Select
              menuPosition="fixed"
              value={selectedSkills}
              onChange={handleOptionChange}
              options={optionHandler()}
              isSearchable={true}
              isMulti
              placeholder="Add Employee Relevant Skills..."
              components={{ ClearIndicator }}
              styles={{
                placeholder: (provided) => ({
                  ...provided,
                  color: "#C5D5DC",
                }),
                dropdownIndicator: (provided) => ({
                  ...provided,
                  color: "#0070AD", // Change this to your desired color
                }),
                control: (provided) => ({
                  ...provided,
                  borderWidth: 0, // Remove the border width
                  backgroundColor: employeeData ? "#F5F9FC" : "white",
                }),
              }}
            />
          </div>
          {!employeeData ? (
            <div className="submitButtonContainer">
              <button className="submitButton">Submit</button>
            </div>
          ) : (
            <div className="submitButtonContainer">
              <button
                type="button"
                onClick={onCloseClick}
                className="cancelButton"
              >
                Cancel
              </button>
              <button onClick={onClickOnSave} className="submitButton">
                Save
              </button>
            </div>
          )}
        </form>
      </div>
      {!employeeData ? (
        <div>
          <img src="/RMtoolSVGs/AddEmployee.svg" alt="AddEmployee" />
        </div>
      ) : null}
    </div>
  );
}

export default AddAnEmployee;
