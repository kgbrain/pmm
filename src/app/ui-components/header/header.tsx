import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './header.css';
import { Card, CardHeader, Button } from '@material-ui/core';

interface IHeaderProps {
  title: string;
  classes: any;
  user: any;
  onDrawerToggle: () => void;
  onLogout: () => void;
}

const Header = ({
  title,
  classes,
  onDrawerToggle,
  onLogout,
  user
}: IHeaderProps) => {
  const [anchorEl, setAnchorEl] = useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <React.Fragment>
      <AppBar color='primary' position='sticky' elevation={0}>
        <Toolbar>
          <Grid container={true} spacing={1} alignItems='center'>
            <Hidden smUp={true}>
              <Grid item={true}>
                <IconButton
                  color='inherit'
                  aria-label='open drawer'
                  onClick={onDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Hidden>
            <Grid item={true} xs={true} />
            <Grid item={true}>
              <Tooltip title={user && user.displayName}>
                <IconButton
                  color='inherit'
                  className={classes.iconButtonAvatar}
                  aria-controls='menu'
                  aria-haspopup='true'
                  onClick={handleClick}
                >
                  <Avatar
                    className={classes.avatar}
                    src={user && user.photoURL}
                    alt={user && user.displayName}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                id='menu'
                anchorEl={anchorEl}
                keepMounted={true}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem>
                  <Card>
                    <CardHeader
                      avatar={
                        <Avatar
                          aria-label='avatar'
                          src={user && user.photoURL}
                          alt={user && user.displayName}
                        />
                      }
                      title={user && user.displayName}
                      subheader={user && user.email}
                    />
                  </Card>
                </MenuItem>
                <MenuItem>
                  <Button
                    variant='contained'
                    fullWidth={true}
                    onClick={() => {
                      onLogout();
                      handleClose();
                    }}
                  >
                    Logout
                  </Button>
                </MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component='div'
        className={classes.secondaryBar}
        color='primary'
        position='static'
        elevation={0}
      >
        <Toolbar>
          <Grid container={true} alignItems='center' spacing={1}>
            <Grid item={true} xs={true}>
              <Typography color='inherit' variant='h5' component='h1'>
                {title}
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default withStyles(styles)(Header);
