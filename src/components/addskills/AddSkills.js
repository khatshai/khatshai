import React, { useState } from "react";
import { postSkills } from "../../services/RMPortalServices";

function AddSkills() {
  const [skill, setSkills] = useState("");

  const [sucessMsgs, setSucessMsg] = useState(null);
  const [error, setError] = useState(null);

  const onSkillsChange = (e) => {
    setSkills(e.target.value);
  };

  const onHandleSkill = async () => {
    const post = await postSkills({ newSkill: skill });
    console.log(post);
    if (post.sucess) {
      setSkills("");
      setSucessMsg(post.msg);
      setError("");
    } else {
      setSucessMsg("");
      setError(post.msg);
    }
  };

  return (
    <div className="addEmployeeContainer">
      <div className="formContainer">
        <p className="sucess">{sucessMsgs}</p>
        <p className="error">{error}</p>
        <h2 className="skillText">Add a new Skill</h2>
        <p className="skillText">
          If you don't find your skills, add your skills here!
        </p>
        <p className="skillText">Add one skill at a time.</p>
        <div className="addSkillContainer">
          <label>Skill Name*</label>
          <input
            className="addSkillInput"
            type="text"
            placeholder="Enter skill name"
            value={skill}
            onChange={onSkillsChange}
          />
          <div className="submitButtonContainer addSkillButton">
            <button className="submitButton" onClick={onHandleSkill}>
              Add Skill
            </button>
          </div>
        </div>
      </div>

      <div>
        <img
          className="marginRight"
          src="/RMtoolSVGs/AddSkillSVG.svg"
          alt="AddSkill"
        />
      </div>
    </div>
  );
}

export default AddSkills;
