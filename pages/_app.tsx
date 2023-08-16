import { useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { customTheme, darkTheme, lightTheme } from '@/themes';
import Cookies from 'js-cookie';

export default function App({ Component, pageProps }: AppProps) {

  const [currentTheme, setCurrentTheme] = useState(lightTheme);

  useEffect(() => {
    const cookieTheme = Cookies.get('theme') || 'light'
    const selectedTheme = cookieTheme === 'light'
    ? lightTheme
    : (cookieTheme === 'dark')
      ? darkTheme
      : customTheme
    
    setCurrentTheme(selectedTheme)
  }, []);  

  return (
    <ThemeProvider theme={ currentTheme }>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
