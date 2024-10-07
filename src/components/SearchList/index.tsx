import { Accordion, AccordionSummary, useTheme, Box, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Repo, { RepoProps } from '../Repo';
import useSWR, { mutate } from 'swr';
import { fetcher } from '../../utils.ts';
import Index from '../Loading';
import { AccordionDetails } from './SearchList.style.ts';

type SearchListProps = {
  username: string;
  reposUrl: string;
};

const SearchList = ({ username, reposUrl }: SearchListProps) => {
  const theme = useTheme();
  const { data: repos, error } = useSWR(reposUrl);

  const handleClickUser = () => {
    mutate(reposUrl, fetcher(reposUrl));
  };

  if (error) {
    return (
      <Typography variant={'body1'} color={'error'}>
        {error.message}
      </Typography>
    );
  }

  return (
    <Box data-testid={'cy_select-list'}>
      <Accordion
        disableGutters={true}
        sx={{
          backgroundColor: theme.palette.grey[100],
          boxShadow: 'none',
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          onClick={handleClickUser}
        >
          <Typography variant={'h6'} fontWeight={600}>
            {username}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {!repos ? (
            <Index />
          ) : !repos?.length ? (
            <Typography variant="body1" textAlign={'center'}>
              No Repository for this user
            </Typography>
          ) : (
            repos?.map(({ id, name, description, stargazers_count }: RepoProps) => (
              <Repo key={id} name={name} description={description} stargazers_count={stargazers_count} />
            ))
          )}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default SearchList;
