import { Stack, Typography, useTheme } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

export type RepoProps = {
  id?: string;
  name: string;
  description: string;
  stargazers_count: string;
};

const Repo = ({ name, description, stargazers_count }: RepoProps) => {
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      maxWidth={'98%'}
      justifyContent="space-between"
      marginLeft={'auto'}
      sx={{
        background: theme.palette.grey[300],
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
      <Stack gap={0.2} direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" fontWeight={600}>
          {stargazers_count}
        </Typography>
        <StarIcon data-testid={'star-icon'} />
      </Stack>
    </Stack>
  );
};

export default Repo;
