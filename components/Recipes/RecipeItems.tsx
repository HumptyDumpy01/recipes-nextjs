// 'use client';

import { Recipe } from '@/components/Recipes/Recipes';

type RecipeItemsType = {
  selectedRecipes: Recipe[];
  handleRecipeClick: (id: string) => void;
  // children: ReactNode;
}

import { Box, Grid, GridItem, Image, Text } from '@chakra-ui/react';

export default function RecipeItems({ selectedRecipes, handleRecipeClick }: RecipeItemsType) {
  return (
    <>
      <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}
      >
        {selectedRecipes.map(recipe => (
          <GridItem
            justifySelf="center"
            width="250px"
            key={recipe.idMeal}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            cursor="pointer"
            onClick={() => handleRecipeClick(recipe.idMeal)}
            _hover={{ boxShadow: 'lg' }}
          >
            <Image src={recipe.strMealThumb} alt={recipe.strMeal} boxSize="250px" objectFit="cover" />
            <Box p={4}>
              <Text textAlign="center" fontSize="lg" fontWeight="semibold">{recipe.strMeal}</Text>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </>
  );
}
