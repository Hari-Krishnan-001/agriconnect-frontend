import api from "./api";

export const loginUser = async (email, password) => {
  const response = await api.post("/api/users/login", {
    email,
    password,
  });

  const data = response.data;

  // Save JWT
  localStorage.setItem("token", data.token);

  // Save basic user information
  localStorage.setItem(
    "user",
    JSON.stringify({
      id: data.id,
      fullName: data.fullName,
      email: data.email,
      role: data.role,
    })
  );

  return data;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  const user = localStorage.getItem("user");

  return user ? JSON.parse(user) : null;
};

export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};