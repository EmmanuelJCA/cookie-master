import { ChangeEvent, FC, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Cookies from 'js-cookie';
import { Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { Layout } from '@/components/layouts';

interface Props {
  theme: string;
}

const ThemeChangerPage:FC<Props> = ({ theme }) => {

  const [currentTheme, setCurrentTheme] = useState('light');

  const onThemeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedTheme = event.target.value;
    setCurrentTheme(selectedTheme);
    Cookies.set('theme', selectedTheme);
  }

  useEffect(() => {
    setCurrentTheme(theme)
  }, [])
  

  return (
    <Layout>
      <Card>
        <CardContent>
          <FormControl>
            <FormLabel>Tema</FormLabel>
            <RadioGroup
              value={ currentTheme }
              onChange={ onThemeChange }
            >
              <FormControlLabel value='light' control={ <Radio /> } label='Light' />
              <FormControlLabel value='dark' control={ <Radio /> } label='Dark' />
              <FormControlLabel value='custom' control={ <Radio /> } label='Custom' />
            </RadioGroup>
          </FormControl>
        </CardContent>
      </Card>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  
  const validThemes = ['light', 'dark', 'custom'];
  const { theme = 'light', name = 'no-name' } = req.cookies;

  return {
    props: {
      theme: validThemes.includes(theme) ? theme : 'dark',
      name
    }
  }
}

export default ThemeChangerPage;