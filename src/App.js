// import React from 'react';
// import { Route, Routes } from 'react-router-dom';
// import LoginPage from './components/LoginPage';
// import UserInformationPage from './components/UserInformationPage';

// const App = () => {
//   return (
    
//     <Routes>
//       <Route path="/" element={<LoginPage />} />  {/* 主页面路由 */}
//       <Route path="/callback" element={<LoginPage />} />  {/* 新增回调路由 */}
//       <Route path="/userinformation" element={<UserInformationPage />} />  {/* 用户信息页面 */}
//     </Routes>
//   );
// };

// export default App;

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';  // 导入 Header 组件
import LoginPage from './components/LoginPage';
import UserInformationPage from './components/UserInformationPage';

const App = () => {
  return (
    <div>
      {/* 添加 Header 组件 */}
      <Header />

      {/* 添加路由管理 */}
      <Routes>
        <Route path="/" element={<LoginPage />} />  {/* 主页面路由 */}
        <Route path="/callback" element={<LoginPage />} />  {/* 回调路由 */}
        <Route path="/userinformation" element={<UserInformationPage />} />  {/* 用户信息页面 */}
      </Routes>
    </div>
  );
};

export default App;
