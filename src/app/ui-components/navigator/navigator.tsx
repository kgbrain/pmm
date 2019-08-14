import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer, { DrawerProps } from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { PaperProps } from '@material-ui/core/Paper';
import { styles } from './navigator.css';
import Link from 'next/link';

const categories = [
  {
    id: 'Develop',
    children: [
      { id: 'Dashboard', icon: <DashboardIcon />, path: '/' }
      // { id: 'Me', icon: <PersonIcon />, path: '/me' }
      // { id: 'Database', icon: <DnsRoundedIcon /> },
      // { id: 'Storage', icon: <PermMediaOutlinedIcon /> },
      // { id: 'Hosting', icon: <PublicIcon /> },
      // { id: 'Functions', icon: <SettingsEthernetIcon /> },
      // { id: 'ML Kit', icon: <SettingsInputComponentIcon /> },
    ]
  }
  // {
  //   id: 'Quality',
  //   children: [
  //     { id: 'Analytics', icon: <SettingsIcon /> },
  //     { id: 'Performance', icon: <TimerIcon /> },
  //     { id: 'Test Lab', icon: <PhonelinkSetupIcon /> },
  //   ],
  // },
];

interface INavigatorProps {
  PaperProps: Partial<PaperProps>;
  route: string;
  variant?: DrawerProps['variant'];
  classes?: any;
  open?: boolean;
  onClose?: () => void;
}

function Navigator(props: INavigatorProps) {
  const { classes, route, onClose, ...other } = props;

  return (
    <Drawer variant='permanent' {...other}>
      <List disablePadding={true}>
        <Link href='/'>
          <ListItem
            button={true}
            className={clsx(
              classes.firebase,
              classes.item,
              classes.itemCategory
            )}
          >
            [<i style={{ fontFamily: 'Georgia, sans-serif' }}>p</i>]MM
          </ListItem>
        </Link>
        <Link href='/pm/create'>
          <ListItem
            button={true}
            onClick={onClose}
            className={clsx(classes.item, classes.itemCategory)}
          >
            <ListItemIcon className={classes.itemIcon}>
              <AddBoxIcon />
            </ListItemIcon>
            <ListItemText
              classes={{
                primary: classes.itemPrimary
              }}
            >
              Post Mortem
            </ListItemText>
          </ListItem>
        </Link>
        {categories.map(({ id, children }) => (
          <React.Fragment key={id}>
            <ListItem className={classes.categoryHeader}>
              <ListItemText
                classes={{
                  primary: classes.categoryHeaderPrimary
                }}
              >
                {id}
              </ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, path }) => (
              <Link key={childId} href={path}>
                <ListItem
                  key={childId}
                  button={true}
                  className={clsx(
                    classes.item,
                    path === route && classes.itemActiveItem
                  )}
                  onClick={onClose}
                >
                  <ListItemIcon className={classes.itemIcon}>
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    classes={{
                      primary: classes.itemPrimary
                    }}
                  >
                    {childId}
                  </ListItemText>
                </ListItem>
              </Link>
            ))}
            <Divider className={classes.divider} />
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
}

export default withStyles(styles)(Navigator);
