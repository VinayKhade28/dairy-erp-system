import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
  Typography,
} from '@mui/material';
import {
  Dashboard,
  People,
  LocalShipping,
  ShoppingCart,
  Inventory,
  AttachMoney,
  Assessment,
  Settings,
  Home,
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  drawerOpen: boolean;
}

interface MenuItem {
  text: string;
  icon: React.ReactNode;
  path: string;
}

const Sidebar: React.FC<SidebarProps> = ({ drawerOpen }) => {
  const location = useLocation();

  const menuItems: MenuItem[] = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/' },
    { text: 'Farmers', icon: <People />, path: '/farmers' },
    { text: 'Milk Collection', icon: <LocalShipping />, path: '/collections' },
    { text: 'Sales', icon: <ShoppingCart />, path: '/sales' },
    { text: 'Inventory', icon: <Inventory />, path: '/inventory' },
    { text: 'Payments', icon: <AttachMoney />, path: '/payments' },
    { text: 'Reports', icon: <Assessment />, path: '/reports' },
    { text: 'Settings', icon: <Settings />, path: '/settings' },
  ];

  const drawerWidth = 240;

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={drawerOpen}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          marginTop: '64px',
          height: 'calc(100% - 64px)',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
          Navigation
        </Typography>
      </Box>
      <Divider />
      
      <List sx={{ pt: 0 }}>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'primary.light',
                color: 'primary.contrastText',
                '& .MuiListItemIcon-root': {
                  color: 'primary.contrastText',
                },
              },
              '&:hover': {
                backgroundColor: 'primary.light',
                color: 'primary.contrastText',
                '& .MuiListItemIcon-root': {
                  color: 'primary.contrastText',
                },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      
      <Divider sx={{ mt: 'auto' }} />
      
      <Box sx={{ p: 2 }}>
        <Typography variant="body2" color="text.secondary" align="center">
          Dairy ERP v1.0
        </Typography>
      </Box>
    </Drawer>
  );
};

export default Sidebar;