import React from 'react';
import { withRouter } from 'next/router';
import Head from 'next/head';
import App, { Container } from 'next/app';
import { ThemeProvider, withStyles } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import firebase from '../firebase';
import Navigator from '../ui-components/navigator/navigator';
import Header from '../ui-components/header/header';
import theme, { appStyles, drawerWidth } from '../ui-components/theme';
import { AuthContext } from '../context';

interface IPmmAppProps {
  classes: any;
}

interface IPmmAppState {
  mobileOpen: boolean;
}

class PmmApp extends App<IPmmAppProps, IPmmAppState> {
  public state = {
    mobileOpen: false,
    user: null
  };

  public componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
        this.props.router.push('/login');
      }
    });
  }

  public render() {
    const { Component, pageProps, classes, router } = this.props;
    const user = this.state.user;

    return (
      <Container>
        <Head>
          <title>[p]MM</title>
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <div className={classes.root}>
            <CssBaseline />
            {user && (
              <nav className={classes.drawer}>
                <Hidden smUp={true} implementation='js'>
                  <Navigator
                    PaperProps={{ style: { width: drawerWidth } }}
                    route={router.route}
                    variant='temporary'
                    open={this.state.mobileOpen}
                    onClose={this.handleDrawerToggle}
                  />
                </Hidden>
                <Hidden xsDown={true} implementation='css'>
                  <Navigator
                    PaperProps={{ style: { width: drawerWidth } }}
                    route={router.route}
                  />
                </Hidden>
              </nav>
            )}
            <div className={classes.appContent}>
              {user && (
                <Header
                  title='Messages'
                  onDrawerToggle={this.handleDrawerToggle}
                  onLogout={this.handleLogout}
                  user={user}
                />
              )}
              <main className={classes.mainContent}>
                <AuthContext.Provider value={{ user }}>
                  <Component {...pageProps} />
                </AuthContext.Provider>
              </main>
            </div>
          </div>
        </ThemeProvider>
      </Container>
    );
  }

  private handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !this.state.mobileOpen }));
  };

  private handleLogout() {
    firebase.auth().signOut();
  }
}

export default withRouter(withStyles(appStyles)(PmmApp));
