import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Logo from './IconMike/logo.png';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FilterListIcon from '@mui/icons-material/FilterList';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import CartComponent from './CartComponent';

const settings = ['Logout'];

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const ResponsiveAppBar = ({
  onSearchChange,
  onMinPriceChange,
  onMaxPriceChange,
  onResetFilter
}: {
  onSearchChange: (query: string) => void;
  onMinPriceChange: (minPrice: number | null) => void;
  onMaxPriceChange: (maxPrice: number | null) => void;
  onResetFilter: () => void;
}) => {
  const [profileAnchorEl, setProfileAnchorEl] = React.useState<null | HTMLElement>(null);
  const [filterCostAnchorEl, setFilterCostAnchorEl] = React.useState<null | HTMLElement>(null);
  const [cartAnchorEl, setCartAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileProfileAnchorEl, setMobileProfileAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileFilterCostAnchorEl, setMobileFilterCostAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileCartAnchorEl, setMobileCartAnchorEl] = React.useState<null | HTMLElement>(null);
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [minPrice, setMinPrice] = React.useState<number | null>(null);
  const [maxPrice, setMaxPrice] = React.useState<number | null>(null);
  

  const isMenuOpen = Boolean(profileAnchorEl);
  const isMobileMenuOpen = Boolean(mobileProfileAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleResetFilter = () => {
    setMinPrice(null);
    setMaxPrice(null);
    onMinPriceChange(null);
    onMaxPriceChange(null);
    onResetFilter();
  };

  const handleFilterCostMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setFilterCostAnchorEl(event.currentTarget);
  };


  const handleMobileProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileProfileAnchorEl(event.currentTarget);
  };

  const handleMobileFilterCostMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileFilterCostAnchorEl(event.currentTarget);
  };

  const handleMobileCartMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileCartAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
  };

  const handleFilterCostMenuClose = () => {
    setFilterCostAnchorEl(null);
  };



  const handleMobileProfileMenuClose = () => {
    setMobileProfileAnchorEl(null);
  };

  const handleMobileFilterCostMenuClose = () => {
    setMobileFilterCostAnchorEl(null);
  };

  const handleMobileCartMenuClose = () => {
    setMobileCartAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const userEmail = localStorage.getItem('email') || 'U';
  const userInitials = getInitials(userEmail);

  function getInitials(email: string): string {
    const name = email.split('@')[0];
    const initials = name.charAt(0).toUpperCase();
    return initials;
  };

  const handleCartOpen = () => {
    setCartDrawerOpen(true);
  };

  const handleCartClose = () => {
    setCartDrawerOpen(false);
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    onSearchChange(event.target.value);
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value ? parseFloat(event.target.value) : null;
    setMinPrice(value);
    onMinPriceChange(value);
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value ? parseFloat(event.target.value) : null;
    const clampedValue = value !== null ? Math.max(value, minPrice || 0) : null;
    
    setMaxPrice(clampedValue);
    onMaxPriceChange(clampedValue);
  };
  const [cartDrawerOpen, setCartDrawerOpen] = React.useState(false);

  const renderMenu = (
    <Menu
      sx={{ mt: '45px' }}
      id="menu-appbar"
      anchorEl={profileAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleProfileMenuClose}
    >
      {settings.map((setting) => (
        <MenuItem
          key={setting}
          onClick={setting === 'Logout' ? handleLogout : handleProfileMenuClose}
        >
          <Typography textAlign="center">{setting}</Typography>
        </MenuItem>
      ))}
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileProfileAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id="primary-search-account-menu-mobile"
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileProfileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const renderFilterCostMenu = (
    <Menu
      id="filter-cost-menu"
      anchorEl={filterCostAnchorEl}
      open={Boolean(filterCostAnchorEl)}
      onClose={handleFilterCostMenuClose}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '95%',
          height:'auto',
          margin: 'auto', // Add this line to center the content
        }}
      >
        <TextField
          label="Min Price"
          type="number"
          value={minPrice || ''}
          onChange={handleMinPriceChange}
          InputProps={{ inputProps: { min: 0 } }}
          size="small"
          sx={{ marginBottom: '8px', width: '100%' }}
        />
        <TextField
          label="Max Price"
          type="number"
          value={maxPrice || ''}
          onChange={handleMaxPriceChange}
          InputProps={{ inputProps: { min: 0 } }}
          size="small"
          sx={{ marginBottom: '8px', width: '100%' }}
        />
        <Button
          variant="contained"
          onClick={handleResetFilter}
          style={{background:'#F9F6F0',color:'black'}}
          sx={{ marginTop: '8px', width: '100%' }}
        >
          Reset
        </Button>
      </div>
    </Menu>
  );
  

  const renderCartDrawer = (
    <Drawer
      anchor="right"
      open={cartDrawerOpen}
      onClose={handleCartClose}
      
    >
      {/* Add your cart content here */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px',  background: '#F9F6F0'}}>
        <ShoppingCartIcon fontSize="large" />
        <IconButton onClick={(handleCartClose) => console.log('Close button clicked')}>
          <CloseIcon fontSize="large" onClick={handleCartClose} />
        </IconButton>
      </div>
      <div style={{ overflowY: 'auto', flex: 1,background: '#F9F6F0' }}>
      <CartComponent />
      </div>
      <div>
      <div style={{ position: 'sticky', bottom: 0, width: '97%', padding: '8px', backgroundColor: '#F9F6F0', borderTop: '1px solid #ccc', textAlign: 'center' }}>
        <Button variant="contained" color="primary" style={{ width:'70%',background: 'black',color:'white'}}>
          Checkout
        </Button>
      </div>
      </div>
      
    </Drawer>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{background:'#F9F6F0'}}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <img src={Logo} alt="Logo" style={{ width: '25%', height: '25%' }} />
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            variant="text"
            style={{color:'black'}}
            sx={{ marginLeft: '2px' }}
            onClick={handleFilterCostMenuOpen}
            startIcon={<FilterListIcon />}
          >
            Filter Cost
          </Button>
          <Button
            variant="text"
            style={{color:'black'}}
            sx={{ marginLeft: '8px' }}
            onClick={handleCartOpen}
          >
            <ShoppingCartIcon />
            Cart
          </Button>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Search style={{color:'black'}}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleSearchChange}
                value={searchQuery}
              />
            </Search>
            <Tooltip title="Open settings">
              <IconButton onClick={handleProfileMenuOpen} sx={{ p: 0 }}>
                <Avatar alt="User" src="/static/images/avatar/2.jpg">
                  {userInitials}
                </Avatar>
              </IconButton>
            </Tooltip>
            {renderFilterCostMenu}
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderCartDrawer}
    </Box>
  );
};

export default ResponsiveAppBar;
