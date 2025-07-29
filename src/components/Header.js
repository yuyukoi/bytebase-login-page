import React, { useState } from 'react';
import { AppBar, Box, Toolbar, Typography, IconButton, Menu, MenuItem, Button, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);  // 用于控制菜单的显示
  const [drawerOpen, setDrawerOpen] = useState(false);  // 控制侧边栏的开关

  // 打开菜单（用于小屏幕的菜单）
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget); // 设置当前点击的按钮为菜单的锚点，显示菜单
  };

  // 关闭菜单
  const handleMenuClose = () => {
    setAnchorEl(null); // 关闭菜单
  };

  // 打开侧边栏（用于小屏幕）
//   const handleDrawerOpen = () => {
//     setDrawerOpen(true);
//   };

  // 关闭侧边栏
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* 新的绿色 Header */}
      <AppBar position="fixed" sx={{ width: '100%', top: 0, left: 0, right: 0, backgroundColor: 'rgb(48, 213, 140)', height: 40 }}>
        <Toolbar sx={{ padding: 0 }}>
          <Typography variant="body1" sx={{ color: 'white', textAlign: 'center', width: '100%' }}>
            Welcome to Bytebase
          </Typography>
        </Toolbar>
      </AppBar>

      {/* 原始的 AppBar，修改背景为白色，保留汉堡按钮 */}
      <AppBar position="fixed" sx={{ width: '100%', top: 40, left: 0, right: 0, backgroundColor: 'white' }}>
        <Toolbar sx={{ padding: 0 }}>
          <Typography variant="h6" sx={{ flexGrow: 1, paddingLeft: 2, color: 'black', fontWeight: 'bold' }}>
            Bytebase
          </Typography>

          {/* 显示菜单按钮（小屏幕时，点击汉堡图标显示菜单） */}
          <IconButton
            size="large"
            edge="end"
            color="black"
            aria-label="menu"
            onClick={handleMenuClick}  // 点击时打开菜单
            sx={{ 
              display: { sm: 'none' },  // 小屏幕上显示
              mr: 2,  // 向左移动一点
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* 在大屏幕上显示导航按钮 */}
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button color="inherit">Home</Button>
            <Button color="inherit">About</Button>
            <Button color="inherit">Sign In</Button>
          </Box>

          {/* 在小屏幕上，点击菜单按钮打开菜单 */}
          <Menu
            anchorEl={anchorEl}  // 设置菜单的锚点
            open={Boolean(anchorEl)}  // 如果 anchorEl 不为空，则显示菜单
            onClose={handleMenuClose}  // 点击菜单项后关闭菜单
            sx={{ display: { sm: 'none' } }}  // 仅在小屏幕上显示
          >
            <MenuItem onClick={handleMenuClose}>Home</MenuItem>
            <MenuItem onClick={handleMenuClose}>About</MenuItem>
            <MenuItem onClick={handleMenuClose}>Sign In</MenuItem>
          </Menu>

          {/* 在小屏幕上显示侧边栏 */}
          <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
            <List sx={{ width: 250 }} role="presentation" onClick={handleDrawerClose}>
              <ListItem button>
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="About" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Sign In" />
              </ListItem>
            </List>
          </Drawer>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
