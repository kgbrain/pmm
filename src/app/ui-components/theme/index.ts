import { red } from '@material-ui/core/colors';
import {
  createMuiTheme,
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});

export const cardStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: theme.spacing(3, 2),
    },
  }),
);

export default theme;
