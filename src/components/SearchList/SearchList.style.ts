import { styled } from '@mui/material';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

export const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  paddingRight: 0,
  paddingBottom: 0,
  paddingTop: theme.spacing(2),
  maxHeight: 500,
  overflowY: 'auto',
}));
