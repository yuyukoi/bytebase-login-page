import React, { useState, useEffect } from 'react';
import { Button, Typography, Container, Box, CircularProgress, Grid } from '@mui/material';  // 引入 MUI 组件
import axios from 'axios';

const CLIENT_ID = 'Ov23lia6FZ5MumBJil3m';  // 从 GitHub 获取的 Client ID
const REDIRECT_URI = 'http://localhost:3000/callback'; // GitHub 配置的回调 URL

const BUTTON_BLACK = 'black';  // 按钮使用黑色

const LoginPage = () => {
  const [user, setUser] = useState(null);  // 存储用户信息的状态
  const [loading, setLoading] = useState(false);  // 控制加载状态

  // Step 1: 重定向到 GitHub 的 OAuth 授权页面
  const handleLogin = () => {
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user`;
    window.location.href = githubAuthUrl;  // 浏览器跳转到 GitHub 授权页面
  };

  // Step 2: 处理 GitHub OAuth 回调
  const handleOAuthCallback = async () => {
    const urlParams = new URLSearchParams(window.location.search);  // 获取 URL 中的查询参数
    const code = urlParams.get('code');  // 获取授权码

    if (code) {
      try {
        setLoading(true);  // 开始加载
        // Step 1: 发送授权码到后端，获取 access token 和用户信息
        const response = await axios.get(`http://localhost:5000/auth/github?code=${code}`);
        
        const userInfo = response.data.user;  // 从后端获取用户信息

        setUser(userInfo);  // 保存用户信息
      } catch (error) {
        console.error('GitHub OAuth 认证失败:', error);
        setLoading(false);  // 停止加载
      }
    }
  };

  // 组件加载时检查 URL 中是否包含 GitHub 回调的 code 参数
  useEffect(() => {
    if (window.location.search.includes('code=')) {
      handleOAuthCallback();  // 调用回调函数处理 GitHub 授权码
    }
  }, []);

  return (
    <Container component="main" maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {/* 背景文字 */}
      <Typography 
        variant="h3" 
        component="h2" 
        sx={{ 
          fontWeight: 'bold', 
          letterSpacing: 0.5, 
          marginBottom: 3, 
          textAlign: 'center', 
          position: 'absolute',  // 使文字固定在屏幕顶部
          top: '25%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', // 居中对齐
          width: '100%',  // 确保文字占满宽度
          color: 'rgba(0, 0, 0, 0.8)',  // 设置文字透明度，作为背景
          wordBreak: 'break-word',  // 确保长单词在容器内换行
        }}
      >
        Database CI/CD and <br />Security <span style={{ color: 'rgb(86, 71, 235)' }}>at Scale</span>
      </Typography>

      {/* 登录界面 */}
      {!user ? (
				
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',  // 上下排列
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', letterSpacing: 0.5, marginTop: 5 }}>
            Login with GitHub
          </Typography>

          <Button 
            fullWidth 
            variant="contained" 
            onClick={handleLogin} 
            sx={{ 
              marginTop: 5,  
              marginBottom: 5,  
              backgroundColor: BUTTON_BLACK,  
              '&:hover': {
                backgroundColor: 'gray',  // 按钮 hover 时的颜色
              },
              borderRadius: '50px',  // 设置按钮圆角，几乎达到半圆
              padding: '12px 50px',  // 设置按钮的宽度和高度，使其接近半圆
              fontWeight: 'bold',  // 按钮文本加粗
              letterSpacing: 0.5,  // 按钮文本字间距
              maxWidth: '300px',  // 限制按钮宽度
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
          </Button>
        </Box>
      ) : (
        // 显示用户信息的 Box
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',  // 上下排列
            alignItems: 'center',
            justifyContent: 'center',
            padding: 5,
            borderRadius: 4,
            boxShadow: 3,
            backgroundColor: 'white',
            width: '100%',
          }}
        >
          <Grid container direction="column" alignItems="center" spacing={2}>
            <Grid item>
              <Typography variant="h6" sx={{ fontWeight: 'bold', letterSpacing: 0.5 }}>Welcome, {user.login}</Typography>
            </Grid>
            <Grid item>
              <img 
                src={user.avatar_url} 
                alt="Avatar" 
                style={{ width: 100, borderRadius: '50%' }} 
              />
            </Grid>
            <Grid item>
              <Typography variant="body1" sx={{ fontWeight: 'bold', letterSpacing: 0.5 }}>GitHub Username: {user.login}</Typography>
            </Grid>
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default LoginPage;
