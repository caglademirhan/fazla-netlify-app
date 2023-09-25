import { createTheme } from '@mui/system';

export const lightTheme = createTheme({
    palette: {
      primary: {
        main: 'orange', // Adjust your preferred color
      },
      secondary: {
        main: 'grey', // Adjust your preferred color
      },
      error: {
        main: 'red', // Adjust your preferred color
      },
      background: {
        paper: 'white', // Adjust your preferred color
      },
    },
    shadows: [
      'none', // No shadow
      '0 4px 6px rgba(0, 0, 0, 0.1)', // Shadow style 1
      '...', // Add more shadow styles as needed
    ],
    // Add other theme options as needed
  });
  
  export const darkTheme = createTheme({
    palette: {
      primary: {
        main: 'navy', // Adjust your preferred color
      },
      secondary: {
        main: 'grey', // Adjust your preferred color
      },
      error: {
        main: 'red', // Adjust your preferred color
      },
      background: {
        paper: 'grey', // Adjust your preferred color
      },
    },
    shadows: [
      'none', // No shadow
      '0 4px 6px rgba(0, 0, 0, 0.1)', // Shadow style 1
      '...', // Add more shadow styles as needed
    ],
    // Add other theme options as needed
  });
  
