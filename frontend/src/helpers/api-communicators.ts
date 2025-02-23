import axios from "axios";

// Get the token (from localStorage, cookies, or wherever you store it)
const getAuthToken = () => localStorage.getItem('auth_token') || ''; // Adjust based on your storage method

export const loginUser = async (email: string, password: string) => {
  const res = await axios.post("/user/login", { email, password });
  if (res.status !== 201) {
    throw new Error("Unable to login");
  }
  const data = await res.data;
  return data;
};

export const signupUser = async (name: string, email: string, password: string) => {
  const res = await axios.post("/user/signup", { name, email, password });
  if (res.status !== 201) {
    throw new Error("Unable to Signup");
  }
  const data = await res.data;
  return data;
};

export const checkAuthStatus = async () => {
  const token = getAuthToken(); // Retrieve the token from localStorage
  const res = await axios.get("/user/auth-status", {
    headers: {
      Authorization: `Bearer ${token}`,  // Pass token in the header
    },
  });
  if (res.status !== 200) {
    throw new Error("Unable to authenticate");
  }
  const data = await res.data;
  return data;
};

export const sentChatRequests = async (message: string) => {
  const token = getAuthToken(); // Retrieve the token from localStorage
  const res = await axios.post("/chat/new", { message }, {
    headers: {
      Authorization: `Bearer ${token}`,  // Pass token in the header
    },
  });

  if (res.status !== 200) {
    console.log("error is in api communicator");
    throw new Error("Unable to send chat");
  }
  const data = await res.data;
  return data;
};

export const getUserChats = async () => {
  const token = getAuthToken(); // Retrieve the token from localStorage
  const res = await axios.get("/chat/all-chats", {
    headers: {
      Authorization: `Bearer ${token}`,  // Pass token in the header
    },
  });
  if (res.status !== 200) {
    throw new Error("Unable to retrieve chats");
  }
  const data = await res.data;
  return data;
};

export const deleteUserChats = async () => {
  const token = getAuthToken(); // Retrieve the token from localStorage
  const res = await axios.delete("/chat/delete", {
    headers: {
      Authorization: `Bearer ${token}`,  // Pass token in the header
    },
  });
  if (res.status !== 200) {
    throw new Error("Unable to delete chats");
  }
  const data = await res.data;
  return data;
};

export const logoutUser = async () => {
  const token = getAuthToken(); // Retrieve the token from localStorage
  const res = await axios.get("/user/logout", {
    headers: {
      Authorization: `Bearer ${token}`,  // Pass token in the header
    },
  });
  if (res.status !== 200) {
    throw new Error("Unable to logout");
  }
  const data = await res.data;
  return data;
};
