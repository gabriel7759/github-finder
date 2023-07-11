const url = process.env.REACT_APP_GITHUB_URL;
const token = process.env.REACT_APP_TOKEN;

export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });

  const response = await fetch(`${url}/search/users?${params}`, {
    headers: {
      Authorization: `token ${token}`,
    },
  });

  const { items } = await response.json();

  return items;
};

export const getUser = async (login) => {
  const response = await fetch(`${url}/users/${login}`, {
    headers: {
      Authorization: `token ${token}`,
    },
  });

  if (response.status === 404) {
    window.location = "/notfound";
  } else {
    const data = await response.json();

    return data;
  }
};

export const getUserRepos = async (login) => {
  const params = new URLSearchParams({
    sort: "created",
    per_page: 10,
  });

  const response = await fetch(`${url}/users/${login}/repos?${params}`, {
    headers: {
      Authorization: `token ${token}`,
    },
  });

  const data = await response.json();

  return data;
};
