import { Stack, Typography, useTheme } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { RepoContainerProps } from './SearchList.tsx';

const RepoContainer = ({ name, description, stargazers_count }: RepoContainerProps) => {
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      maxWidth={'98%'}
      justifyContent="space-between"
      marginLeft={'auto'}
      sx={{
        backgroundColor: theme.palette.secondary.dark,
        padding: 2,
        marginBottom: theme.spacing(2),
      }}
    >
      <Stack>
        <Typography variant="h6" fontWeight={600}>
          {name}
        </Typography>
        <Typography variant="h6">{description}</Typography>
      </Stack>
      <Stack gap={0.2} direction="row" justifyContent="space-between" alignItems="start">
        <Typography variant="h5" fontWeight={600}>
          {stargazers_count}
        </Typography>
        <StarIcon data-testid={'star-icon'} sx={{ marginTop: 0.3 }} />
      </Stack>
    </Stack>
  );
};

export default RepoContainer;
