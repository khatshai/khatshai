import React, { useState, useEffect, useCallback } from "react";
import Select, { components } from "react-select";
import LockSVG from "../../lockImage/LockSVG";
import AddAnEmployee from "./AddAnEmployee";
import { fetchSkills, search, status } from "../../services/RMPortalServices";

const customStyles = {
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
    borderWidth: 1.5, // Remove the border width
    borderColor: "#0070AD",
  }),
};

const ClearIndicator = (props) => {
  return (
    <components.ClearIndicator {...props}>
      <button className="clearAllButton" onClick={props.clearValue}>
        Clear All
      </button>
    </components.ClearIndicator>
  );
};

function ViewEmployees() {
  const [error, setError] = useState("");
  const [editClicked, setEditClick] = useState(false);
  const [noItemsFound, setNoItemsFound] = useState("");

  const [skillJson, setSkillJson] = useState([]);

  const [selectedSkills, setSelectedSkills] = useState([]);

  const [searchedEmps, setSearchedEmps] = useState([]);
  const [showNoItemsPopUp, setShowNoItemsPopUp] = useState(false);
  const [employeeData, setEmployeeData] = useState([]);
  const [isDelete, setIsDelete] = useState([]);
  const optionHandler = useCallback(() => {
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
        })); // Map to the expected format
    } else {
      if(skillJson.length) // Map to the expected format
      {
        return skillJson.map((value) => ({
          value: value.skill,
          label: value.skill,
          id: value.id,
        }));
      }else{
        return [];
      }
    }
  }, [selectedSkills, skillJson]);

  const handleOptionChange = (selectedOption) => {
    setSelectedSkills(selectedOption);
  };

  const fetchData = useCallback(async () => {
    const searchSkillIds = [];
    skillJson.forEach((value) =>
      selectedSkills.some(
        (item) => item.id === value.id && searchSkillIds.push(item.id)
      )
    );
    const skillsSearchResponse = await search({searchSkillIds});
    if (skillsSearchResponse.status) {
      const skillsSearchJson = await skillsSearchResponse.data;
      setSearchedEmps(skillsSearchJson);
      setError("");
      if (searchSkillIds.length) {
        if (!skillsSearchJson.length) {
          setNoItemsFound("There are no records found based on your selection");
          setShowNoItemsPopUp(true);
        } else setNoItemsFound("");
      }
    } else {
      setError("Retry there is some issue");
    }
  }, [skillJson, selectedSkills]);

  useEffect(() => {
    skillJson.length && fetchData();
  }, [fetchData, skillJson]);

  useEffect(() => {
    const fetchSkillsData = async () => {
      const skillsJson = await fetchSkills();
      setSkillJson(skillsJson);
    };
    fetchSkillsData();
  }, []);

  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);

  const onEditClick = (emp) => {
    setEditClick(true);
    setEmployeeData(emp);
  };

  const onCloseClickHandler = () => {
    setEditClick(false);
  };

  const onDeleteClick = (item) => {
    setShowConfirmationPopup(true);
    setIsDelete(item);
  };

  const confirmDelete = useCallback(() => {
    setShowConfirmationPopup(false);
    console.log(isDelete, "at delete employee data");
    if (isDelete) {
      fetch("http://localhost:8082/deleteemp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(isDelete),
      });
    }
  }, [isDelete]);

  const cancelDelete = useCallback(() => {
    setShowConfirmationPopup(false);
    setIsDelete(false);
  }, []);

  const onClickOk = useCallback(() => {
    setShowNoItemsPopUp(false);
  }, []);

  const onSaveClickHandler = () => {
    // setSelectedSkills([]);
    // setSearchedEmps([]);
  };

  const isLockClicked = useCallback(async (item) => {
    try{
      const response = await status({item});
      if(response.status){
        fetchData();
      }
    }catch(error){
      setError("Try Again!");
    }
  },[fetchData]);

  const isReleaseClicked = useCallback(async (item) => {
    try{
      const response = await status({item});
      if(response.status){
        fetchData();
      }
    }catch(error){
      setError("Try Again!");
    }
  },[fetchData]);

  useEffect(() => {
    const storedSelectedSkills = localStorage.getItem("selectedSkills");
    if (storedSelectedSkills.length) {
      const skillsArray = JSON.parse(storedSelectedSkills);
      setSelectedSkills(skillsArray);
    }
  }, []);

  useEffect(() => {
    const storedSearchedEmps = localStorage.getItem("searched");
    if (storedSearchedEmps) {
      const parsedSearchedEmps = JSON.parse(storedSearchedEmps);
      setSearchedEmps(parsedSearchedEmps);
    }
  }, []);

  useEffect(() => {
    const arrayJson = JSON.stringify(selectedSkills);
    localStorage.setItem("selectedSkills", arrayJson);
  }, [selectedSkills]);

  useEffect(() => {
    const selectedEmps = JSON.stringify(searchedEmps);
    localStorage.setItem("searched", selectedEmps);
  }, [searchedEmps]);

  return (
    <div>
      <div style={{ margin: "1%" }}>
        <Select
          menuPosition="fixed"
          value={selectedSkills}
          onChange={handleOptionChange}
          options={optionHandler()}
          isSearchable={true}
          isMulti
          placeholder="Add Employee Relevant Skills..."
          styles={customStyles}
          components={{ ClearIndicator }}
        />
      </div>
      {selectedSkills.length && searchedEmps.length ? (
        <div className="tableContainer">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Id</th>
                <th>Email</th>
                <th>Name</th>
                <th>Grade</th>
                <th>Base Location</th>
                <th>Work Location</th>
                <th>skills</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {Object.values(searchedEmps).map((item, key) => (
                <tr key={key}>
                  <td>{item.isLocked ? <LockSVG color={"#002439"} /> : ""}</td>
                  <td className={item.isLocked ? "tdOnLock" : null}>
                    {" "}
                    {item.employeeId}
                  </td>
                  <td className={`tdEmail ${item.isLocked ? "tdOnLock" : ""}`}>
                    {item.employeeEmailId}
                  </td>
                  <td className={`tdEmail ${item.isLocked ? "tdOnLock" : ""}`}>
                    {item.employeeName}
                  </td>
                  <td className={item.isLocked ? "tdOnLock" : null}>
                    {item.employeeGrade}
                  </td>
                  <td className={item.isLocked ? "tdOnLock" : null}>
                    {item.employeeBaseLocation}
                  </td>
                  <td className={item.isLocked ? "tdOnLock" : null}>
                    {item.employeeWorkLocation}
                  </td>
                  <td
                    className={`tdEmail tdSkills ${
                      item.isLocked ? "tdOnLock" : ""
                    }`}
                  >
                    <>
                      {item.empSkills.map((skillId, key) =>
                        skillJson.map(
                          (skills) =>
                            skills.id === skillId && (
                              <p key={key + 2}>{skills.skill}, </p>
                            )
                        )
                      )}
                    </>
                  </td>
                  <td>
                    <div className="actionsContainer">
                      <button
                        className="actionsButton"
                        disabled={item.isLocked}
                        onClick={() => onEditClick(item)}
                      >
                        {" "}
                        <img
                          className="marginRight"
                          src="/RMtoolSVGs/Edit.svg"
                          alt="Edit"
                        />{" "}
                        Edit
                      </button>
                      <button
                        className="actionsButton"
                        disabled={item.isLocked}
                        onClick={() => onDeleteClick(item)}
                      >
                        {" "}
                        <img
                          className="marginRight"
                          src="/RMtoolSVGs/Delete.svg"
                          alt="Delete"
                        />{" "}
                        Delete
                      </button>
                      {!item.isLocked ? (
                        <button
                          className="actionsButton"
                          onClick={() => isLockClicked(item)}
                        >
                          <LockSVG color={"#FFFFFF"} /> Lock
                        </button>
                      ) : (
                        <button
                          className="actionsButton"
                          onClick={() => isReleaseClicked(item)}
                        >
                          <img
                            className="marginRight"
                            src="/RMtoolSVGs/Unlock.svg"
                            alt="UnLock"
                          />{" "}
                          Release
                        </button>
                      )}
                      {showConfirmationPopup && (
                        <div className="popup">
                          <div className="popup-content">
                            <h2>Delete Confirmation</h2>
                            <p>
                              Are you sure you want to delete this employee?
                            </p>
                            <button
                              className="popUpNobutton"
                              onClick={cancelDelete}
                            >
                              No
                            </button>
                            <button
                              className="popUpYesbutton"
                              onClick={confirmDelete}
                            >
                              Yes
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      {showNoItemsPopUp && noItemsFound !== "" && (
        <div className="popup">
          <div className="popup-content">
            <h2>No Records Found!</h2>
            <p>{noItemsFound}</p>
            <button className="popUpYesbutton" onClick={onClickOk}>
              Ok
            </button>
          </div>
        </div>
      )}
      {
        <div>
          <p>{error}</p>
        </div>
      }
      {editClicked && (
        <AddAnEmployee
          onSaveClickHandler={onSaveClickHandler}
          employeeData={employeeData}
          onCloseClickHandler={onCloseClickHandler}
          fetchData={fetchData}
        />
      )}
    </div>
  );
}

export default ViewEmployees;
