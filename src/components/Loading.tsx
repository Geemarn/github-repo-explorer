import { Skeleton } from '@mui/material';

const Loading = () => {
  return (
    <div data-testid={'loading'}>
      {[...Array(5)].map((_, i) => (
        <Skeleton role={'skeleton-loader'} width="100%" height={80} key={i} />
      ))}
    </div>
  );
};

export default Loading;
