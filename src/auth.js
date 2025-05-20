const API_BASE = "http://localhost:8080";

export const login = async (username, password) => {
  const token = btoa(`${username}:${password}`);
  const res = await fetch(`${API_BASE}/auth/profile`, {
    method: "GET",
    headers: {
      'Authorization': `Basic ${token}`
    }
  });

  if (res.ok) {
    const data = await res.json();
    localStorage.setItem("auth", token);
    localStorage.setItem("role", data.roles[0].name); // ROLE_USER or ROLE_ADMIN
    return true;
  } else {
    return false;
  }
};

export const register = async (username, password, role) => {
  const params = new URLSearchParams();
  params.append("username", username);
  params.append("password", password);
  params.append("role", role);

  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: params
  });

  return res.ok;
};

export const logout = () => {
  localStorage.removeItem("auth");
  localStorage.removeItem("role");
};

export const isAuthenticated = () => !!localStorage.getItem("auth");

export const isAdmin = () => localStorage.getItem("role") === "ROLE_ADMIN";

export const getAuthHeader = () => ({
  Authorization: `Basic ${localStorage.getItem("auth")}`
});