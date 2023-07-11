import { Box, Button, ButtonGroup, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { PRODUCTS_MAP, ShoppingCartItem } from "../models";

const ItemsListWrapper = styled(Box)(() => ({
  paddingTop: 20
}));

type ItemsListProps = {
  items: ShoppingCartItem[];
  onRemoveItem: (productId: string) => void;
  onIncreaseItem: (productId: string) => void;
  onDecreaseItem: (productId: string) => void;
};

const ItemsList: React.FC<ItemsListProps> = ({
  items,
  onRemoveItem,
  onIncreaseItem,
  onDecreaseItem
}) => {
  const handleRemove = (productId: string) => {
    onRemoveItem(productId);
  };
  const handleIncrease = (productId: string) => {
    onIncreaseItem(productId);
  };
  const handleDecrease = (productId: string) => {
    onDecreaseItem(productId);
  };

  return (
    <ItemsListWrapper>
      {items.map((item) => {
        const product = PRODUCTS_MAP[item.productId];
        const price = product?.price || 0;
        if (item.quantity <= 0) {
          return null;
        }

        return (
          <Grid container key={item.productId}>
            <Grid item xs={12}>
              <Typography>{product?.label}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{`${item.quantity} x $${price} = $${
                item.quantity * price
              }`}</Typography>
            </Grid>
            <ButtonGroup variant="outlined" aria-label="outlined button group">
              <Button onClick={() => handleIncrease(item.productId)}>+</Button>
              <Button onClick={() => handleDecrease(item.productId)}>-</Button>
              <Button onClick={() => handleRemove(item.productId)}>x</Button>
            </ButtonGroup>
          </Grid>
        );
      })}
    </ItemsListWrapper>
  );
};

export default ItemsList;
