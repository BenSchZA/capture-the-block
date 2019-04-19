import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

export const colors = {

}

const theme = createMuiTheme({
  palette: {
    type: 'light',
  },
  typography: {
    useNextVariants: true,
    fontFamily: '\'Roboto\', sans-serif',
  }
});

export default theme;
