import { Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";

import { ShoppingCartItem } from "../models";

import AddItemForm from "./AddItemForm";
import ItemsList from "./ItemsList";
import Total from "./Total";

const ShoppingCardWrapper = styled(Paper)(() => ({
  width: 600,
  margin: "auto",
  padding: 50,
  minHeight: 500
}));

const ShoppingCartHeader = styled(Typography)(() => ({
  textTransform: "uppercase",
  fontWeight: "bold",
  fontSize: 24
}));

const ShoppingCart = () => {
  const [items, setItems] = useState<ShoppingCartItem[]>([]);

  const onAddItem = (item: ShoppingCartItem): void => {
    const { productId } = item;
    const curItem = items.find((item) => item.productId === productId);

    if (curItem) {
      const newState = items.map((item) => {
        if (curItem.productId === item.productId) {
          return {
            ...curItem,
            quantity: curItem.quantity + item.quantity
          };
        } else {
          return item;
        }
      });

      setItems(newState);
    } else {
      setItems((prev) => [...prev, item]);
    }
  };

  const onRemoveItem = (productId: string) => {
    const newItems = items.filter((curItem) => curItem.productId !== productId);
    setItems(newItems);
  };
  const onClearList = () => {
    setItems([]);
  };

  const onIncreaseItem = (productId: string) => {
    const curItem = items.find((item) => item.productId === productId);
    if (curItem) {
      const newState = items.map((item) => {
        if (item.productId === curItem.productId) {
          return {
            ...item,
            quantity: item.quantity + 1
          };
        } else {
          return item;
        }
      });
      setItems(newState);
    }
  };

  const onDecreaseItem = (productId: string) => {
    const curItem = items.find((item) => item.productId === productId);
    if (curItem) {
      const newState = items.map((item) => {
        if (curItem.productId === item.productId) {
          return {
            ...item,
            quantity: item.quantity - 1
          };
        } else {
          return item;
        }
      });

      setItems(newState);
    }
  };

  return (
    <ShoppingCardWrapper>
      <ShoppingCartHeader>Shopping Cart</ShoppingCartHeader>
      <AddItemForm onAddItem={onAddItem} />
      {!!items?.length && (
        <>
          <ItemsList
            onIncreaseItem={onIncreaseItem}
            onDecreaseItem={onDecreaseItem}
            onRemoveItem={onRemoveItem}
            items={items}
          />
          <Total onClearList={onClearList} items={items} />
        </>
      )}
    </ShoppingCardWrapper>
  );
};

export default ShoppingCart;
