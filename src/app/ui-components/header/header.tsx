import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import HelpIcon from '@material-ui/icons/Help';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './header.css';

interface IHeaderProps {
  title: string;
  classes: any;
  onDrawerToggle: () => void;
}

const Header = ({ title, classes, onDrawerToggle }: IHeaderProps) => (
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
            <Tooltip title='Alerts • No alters'>
              <IconButton color='inherit'>
                <NotificationsIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item={true}>
            <IconButton color='inherit' className={classes.iconButtonAvatar}>
              <Avatar
                className={classes.avatar}
                src='https://robohash.org/pmm?set=set3&bgset=&size=32x32'
                alt='My Avatar'
              />
            </IconButton>
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

export default withStyles(styles)(Header);
