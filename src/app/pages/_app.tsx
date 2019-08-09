import React from 'react';
import Head from 'next/head';
import App, { Container } from 'next/app';
import { ThemeProvider, withStyles, createStyles } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Navigator from '../ui-components/navigator/navigator';
import Header from '../ui-components/header/header';
import theme from '../ui-components/theme';

const drawerWidth = 256;

const styles = createStyles({
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  mainContent: {
    flex: 1,
    padding: '48px 36px 0',
    background: '#eaeff1',
  },
});

interface IPmmAppProps {
  classes: any;
}

interface IPmmAppState {
  mobileOpen: boolean;
}

class PmmApp extends App<IPmmAppProps, IPmmAppState>  {
  public state = {
    mobileOpen: false,
  };

  public componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  public render() {
    const { Component, pageProps, classes } = this.props;

    return (
      <Container>
        <Head>
          <title>[p]MM</title>
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <div className={classes.root}>
            <CssBaseline />
            <nav className={classes.drawer}>
              <Hidden smUp={true} implementation='js'>
                <Navigator
                  PaperProps={{ style: { width: drawerWidth } }}
                  variant='temporary'
                  open={this.state.mobileOpen}
                  onClose={this.handleDrawerToggle}
                />
              </Hidden>
              <Hidden xsDown={true} implementation='css'>
                <Navigator PaperProps={{ style: { width: drawerWidth } }} />
              </Hidden>
            </nav>
            <div className={classes.appContent}>
              <Header title='Messages' onDrawerToggle={this.handleDrawerToggle} />
              <main className={classes.mainContent}>
                <Component {...pageProps} />
              </main>
            </div>
          </div>
        </ThemeProvider>
      </Container>
    );
  }

  private handleDrawerToggle = () => {
    this.setState((state) => ({ mobileOpen: !this.state.mobileOpen }));
  }
}

export default withStyles(styles)(PmmApp);
