import { Box, Button, FormControl, MenuItem, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState, ChangeEvent } from "react";

import { ALL_PRODUCTS, ShoppingCartItem } from "../models";

const AddItemBox = styled(Box)(() => ({
  display: "flex",
  flex: 1,
  marginTop: "25px"
}));

const ItemSelectWrapper = styled(FormControl)(() => ({
  width: "200px",
  marginRight: "20px"
}));

const QuantityInputWrapper = styled(FormControl)(() => ({
  width: "80px",
  marginRight: "20px"
}));

type AddItemFormProps = {
  onAddItem: (item: ShoppingCartItem) => void;
};

const AddItemForm: React.FC<AddItemFormProps> = ({
  onAddItem
}: AddItemFormProps) => {
  const [productId, setProductId] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);

  const handleAddItem = () => {
    if (quantity > 0) {
      onAddItem({ productId, quantity });
      setProductId("");
      setQuantity(0);
    }
  };

  const handleSetProductId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductId(event.target.value);
  };

  const handleSetQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(event.target.value));
  };

  return (
    <AddItemBox>
      <ItemSelectWrapper>
        <TextField
          onChange={handleSetProductId}
          select
          value={productId}
          label="Product"
        >
          {ALL_PRODUCTS.map((product) => (
            <MenuItem key={product.id} value={product.id}>
              {product.label}
            </MenuItem>
          ))}
        </TextField>
      </ItemSelectWrapper>
      <QuantityInputWrapper>
        <TextField
          onChange={handleSetQuantity}
          label="Quantity"
          type="number"
          value={quantity}
        />
      </QuantityInputWrapper>
      <Button
        onClick={handleAddItem}
        variant="contained"
        disabled={!quantity || !productId}
      >
        Add
      </Button>
    </AddItemBox>
  );
};

export default AddItemForm;
