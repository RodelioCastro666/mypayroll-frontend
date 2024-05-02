import axios from "../api/axios";







export const registerUser = async (newUser) => {
  return await axios.post("/auth/signup", newUser);
};

export const loginUser = async (logUser) => {
  return await axios.post("/auth/signin", logUser);
};

export const getAllOrganization = async () => {
  
 
  const response = await axiosRequest.get("/organizations");

  return response.data;
};
