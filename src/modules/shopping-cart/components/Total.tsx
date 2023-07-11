import { Box, Button, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { PRODUCTS_MAP, ShoppingCartItem } from "../models";

const TotalWrapper = styled(Box)(() => ({
  paddingTop: 40
}));

type TotalProps = {
  items: ShoppingCartItem[];
  onClearList: () => void;
};

const Total: React.FC<TotalProps> = ({ items, onClearList }) => {
  return (
    <TotalWrapper>
      <Grid container>
        <Grid item xs={6}>
          <Typography>{`Total: $`}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Button onClick={onClearList} variant="outlined">
            Clear
          </Button>
        </Grid>
      </Grid>
    </TotalWrapper>
  );
};

export default Total;
