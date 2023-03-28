const fetcher = async ({ url, method, body, json = true }) => {
    const res = await fetch(url, {
      method,
      ...(body && {body: JSON.stringify(body)}),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  
    if (!res.ok) {
      throw new Error("API Error");
    }
  
    if (json) {
      const data = await res.json();
      return data.data;
    }
  };
  
  export const register = async (user) => {
    return fetcher({
      url: "/api/register",
      method: "POST",
      body: user,
      json: false,
    });
  };
  
  export const signin = async (user) => {
    return fetcher({
      url: "/api/signin",
      method: "POST",
      body: user,
      json: false,
    });
  };

  export const createNewProject = (name) => {
    return fetcher({
      url: "/api/project",
      method: "POST",
      body: { name },
    });
  };

  export const deleteProject = (id) => {
    return fetcher({
      url: "/api/deleteProject",
      method: "POST",
      body: { id },
    });
  };

  export const updateTask = async (name, description, status, id) => {
    return fetcher({
      url: "/api/updateTask",
      method: "POST",
      body: { name, description, status, id },
    });
  };

  export const deleteTask = (id) => {
    return fetcher({
      url: "/api/deleteTask",
      method: "POST",
      body: { id },
    });
  };

  export const updateProjectName = async (name, id) => {
    return fetcher({
      url: "/api/updateProjectName",
      method: "POST",
      body: { name, id },
    });
  };

  export const createNewTask = (name, description, status, projectId) => {
    return fetcher({
      url: "/api/createNewTask",
      method: "POST",
      body: { name, description, status, projectId },
    });
  };