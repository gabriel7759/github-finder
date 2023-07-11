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
