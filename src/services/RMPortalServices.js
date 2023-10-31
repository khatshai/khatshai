import axios from "axios";

const API_BASE_URL = "http://localhost:8082";

export async function postSkills({newSkill}) {
  console.log(newSkill,"newskill");
  try{

  const response = await axios.post(`${API_BASE_URL}/skills`, { skill: newSkill });

  if (response.status){
    return {sucess:true, msg:"Skill Added Sucessfully"};
  }else{
    return {sucess:false, msg:"Skill is already added"};
  }
  }catch(error){
    console.log(error);
    return {sucess: false, msg:"Network error, Try again later!"};
  }
}

export async function fetchSkills() {
    return await axios.get(`${API_BASE_URL}/skills`)
      .then(response => response.data);
}

export async function addUpdateEmp({ method, formData}) {
  console.log(formData,"newskill");
 
  const response = method==="POST" ? await axios.post(`${API_BASE_URL}/emp`, formData) : await axios.put(`${API_BASE_URL}/update`, formData);

  const data = response;

  return data;
}

export async function search({searchSkillIds}) {
  console.log(searchSkillIds,"newskill");

  const response = await axios.post(`${API_BASE_URL}/search`,{ skillsIds: searchSkillIds });

  return response;
}

export async function status({item}) {

  const response = await axios.put(`${API_BASE_URL}/status`, item);

  return response;
}
