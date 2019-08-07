import { Paper, Typography } from '@material-ui/core';
import PmmButton from '../pmmButton/pmmButton';
import theme, { cardStyles } from '../theme';

export default function Home() {
  const classes = cardStyles(theme);
  return (
    <Paper className={classes.root}>
      <div>
        <PmmButton
          buttonOpts={{ color: 'primary', variant: 'contained' }}
          linkOpts={{ href: '/me' }}
        >
          Click me
        </PmmButton>
      </div>
      <br />
      <Typography variant='body2' color='textSecondary' display='block'>
        Built with ❤️ by KGBrain
      </Typography>
    </Paper>
  );
}
