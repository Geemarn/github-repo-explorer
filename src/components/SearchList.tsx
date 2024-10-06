import { Accordion, AccordionSummary, useTheme, styled, Box, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import RepoContainer from './RepoContainer.tsx';
import useSWR, { mutate } from 'swr';
import { fetcher } from '../utils.ts';
import Loading from './Loading.tsx';

export type RepoContainerProps = {
  id?: string;
  name: string;
  description: string;
  stargazers_count: string;
};

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
    <Box>
      <Accordion
        disableGutters={true}
        sx={{
          backgroundColor: theme.palette.secondary.main,
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
            <Loading />
          ) : !repos?.length ? (
            <Typography variant="body1" textAlign={'center'}>
              No Repository for this user
            </Typography>
          ) : (
            repos?.map(({ id, name, description, stargazers_count }: RepoContainerProps) => (
              <RepoContainer key={id} name={name} description={description} stargazers_count={stargazers_count} />
            ))
          )}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default SearchList;

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  paddingRight: 0,
  paddingBottom: 0,
  paddingTop: theme.spacing(2),
  maxHeight: 500,
  overflowY: 'auto',
}));
