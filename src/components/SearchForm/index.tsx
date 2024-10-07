import { Button, Stack, TextField, Typography, useTheme } from '@mui/material';
import { Dispatch, FormEvent, SetStateAction } from 'react';

type SearchInputProps = {
  setInputValue: Dispatch<SetStateAction<string>>;
  handleSubmitForm: (e: FormEvent<HTMLFormElement>) => void;
  errormessage?: string;
};

const SearchForm = ({ setInputValue, handleSubmitForm, errormessage }: SearchInputProps) => {
  const theme = useTheme();

  return (
    <form role={'form'} onSubmit={handleSubmitForm}>
      <Stack gap={2}>
        <TextField
          id="outlined-basic"
          variant={'outlined'}
          sx={{ backgroundColor: theme.palette.grey[100] }}
          onChange={(e) => setInputValue(e.target.value)}
          label="Enter Username"
        />
        {errormessage && (
          <Typography variant={'body1'} color="error">
            {errormessage}
          </Typography>
        )}
        <Button type={'submit'} variant="contained" sx={{ height: 52 }}>
          Search
        </Button>
      </Stack>
    </form>
  );
};

export default SearchForm;
