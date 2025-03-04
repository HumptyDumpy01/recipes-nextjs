// 'use client';

import { ListItem } from '@chakra-ui/react';

interface RecipeItemProps {
  ingredient: {
    name: string;
    measure: string;
  };
  handleIngredientClick: (ingredientName: string) => void;
}

export default function RecipeItem({ ingredient, handleIngredientClick }: RecipeItemProps) {
  return (
    <ListItem
      border={`1px solid`}
      borderRadius={12}
      p={2}
      mb={2}
      textAlign={`center`}
      listStyleType="none"
      color="blue.500"
      cursor="pointer"
      onClick={() => handleIngredientClick(ingredient.name)}
    >
      {ingredient.measure} {ingredient.name}
    </ListItem>
  );
}