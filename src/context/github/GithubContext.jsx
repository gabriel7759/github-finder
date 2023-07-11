import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const url = process.env.REACT_APP_GITHUB_URL;
const token = process.env.REACT_APP_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  const searchUsers = async (text) => {
    setLoading(true);

    const params = new URLSearchParams({
      q: text,
    });

    const response = await fetch(`${url}/search/users?${params}`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });

    const { items } = await response.json();

    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  };

  const getUser = async (login) => {
    setLoading(true);

    const response = await fetch(`${url}/users/${login}`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });

    if(response.status === 404) {
      window.location = '/notfound';
    } else {
      const data = await response.json();

      dispatch({
        type: "GET_USER",
        payload: data,
      });
    }
  };

  const getUserRepos = async (login) => {
    setLoading(true);

    const params = new URLSearchParams({
      sort: 'created',
      per_page: 10
    });

    const response = await fetch(`${url}/users/${login}/repos?${params}`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });

    const data = await response.json();

    dispatch({
      type: "GET_REPOS",
      payload: data,
    });
  };

  const clearUsers = () => {
    dispatch({
      type: "GET_USERS",
      payload: [],
    });
  };

  const setLoading = (val) =>
    dispatch({
      type: "SET_LOADING",
      val: val,
    });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,        
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,        
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
