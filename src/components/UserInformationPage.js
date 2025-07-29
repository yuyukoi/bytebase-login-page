import React from 'react';
import { useLocation } from 'react-router-dom';

const UserInformationPage = () => {
  const location = useLocation();
  const { user } = location.state || {};  // 从 location.state 获取传递的用户数据

  if (!user) {
    return <p>Loading user information...</p>;  // 如果没有用户数据，则显示加载中
  }

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>User Information</h1>
      <h2>Welcome, {user.name || user.login}</h2>
      <img 
        src={user.avatar_url} 
        alt="Profile" 
        style={{ width: 150, borderRadius: '50%', marginBottom: '20px' }} 
      />
      <p>Email: {user.email ? user.email : 'Not provided'}</p>
      <p>GitHub Username: {user.login}</p>
      <p>Followers: {user.followers}</p>
      <p>Following: {user.following}</p>
      <p>Public Repositories: {user.public_repos}</p>
    </div>
  );
};

export default UserInformationPage;
