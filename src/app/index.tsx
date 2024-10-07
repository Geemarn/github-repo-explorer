import SearchForm from '../components/SearchForm';
import { Container, Typography, Stack } from '@mui/material';
import SearchList from '../components/SearchList';
import useSWR from 'swr';
import { FormEvent, useState } from 'react';
import Index from '../components/Loading';
import { fetcher } from '../utils.ts';

type UserData = {
  id: string;
  login: string;
  repos_url: string;
};

const USERS_GITHUB_URL = 'https://api.github.com/search/users?per_page=5&page=1';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [inputSubmitValue, setInputSubmitValue] = useState('');

  const { data, error, isLoading } = useSWR([inputSubmitValue], () =>
    inputSubmitValue ? fetcher(`${USERS_GITHUB_URL}&q=${inputSubmitValue}`) : null,
  );

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInputSubmitValue(inputValue);
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 10 }}>
      <Stack gap={2}>
        <SearchForm errormessage={error?.message} setInputValue={setInputValue} handleSubmitForm={handleSubmitForm} />
        {inputSubmitValue && (
          <Typography variant="h6" color="textSecondary" fontWeight={500}>
            Showing users for "{inputSubmitValue}"
          </Typography>
        )}
        {isLoading ? (
          <Index />
        ) : (
          data?.items?.map(({ id, login, repos_url }: UserData) => (
            <SearchList key={id} username={login} reposUrl={repos_url} />
          ))
        )}
      </Stack>
    </Container>
  );
};

export default App;
