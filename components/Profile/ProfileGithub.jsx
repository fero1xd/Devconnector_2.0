import axios from "axios";
import { useEffect, useState } from "react";

const ProfileGithub = ({ username }) => {

  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const getRepos = async () => {
      const { data } = await axios.get(`/api/profile/github/${username}`);
      setRepos(data);
    }

    getRepos();
  }, [])

  return (
    <div className='profile-github'>
      <h2 className='text-primary my-1'>Github Repos</h2>
      {repos.map((repo) => (
        <div key={repo.id} className='repo bg-white p-1 my-1'>
          <div>
            <h4>
              <a href={repo.html_url} target='_blank' rel='noopener noreferrer'>
                {repo.name}
              </a>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div>
            <ul>
              <li className='badge badge-primary'>
                Stars: {repo.stargazers_count}
              </li>
              <li className='badge badge-dark'>
                Watchers: {repo.watchers_count}
              </li>
              <li className='badge badge-light'>Forks: {repo.forks_count}</li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileGithub;
