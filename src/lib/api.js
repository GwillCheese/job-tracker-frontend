const API_URL = "/api";

export const api = {
  register: async (email, password) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Registration failed");
    }
    return res.json();
  },

  login: async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Login failed");
    }
    return res.json();
  },

  getJobs: async (token, filters = {}) => {
    const params = new URLSearchParams(filters);
    const res = await fetch(`${API_URL}/jobs?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch jobs");
    return res.json();
  },

  createJob: async (token, jobData) => {
    const res = await fetch(`${API_URL}/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(jobData),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to create job");
    }
    return res.json();
  },

  updateJob: async (token, jobId, jobData) => {
    const res = await fetch(`${API_URL}/jobs/${jobId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(jobData),
    });
    if (!res.ok) throw new Error("Failed to update job");
    return res.json();
  },

  deleteJob: async (token, jobId) => {
    const res = await fetch(`${API_URL}/jobs/${jobId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to delete job");
    return res.json();
  },
};
