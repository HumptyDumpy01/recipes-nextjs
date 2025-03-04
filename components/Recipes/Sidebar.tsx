// 'use client';

import { Heading, ListItem, UnorderedList } from '@chakra-ui/react';

interface SidebarProps {
  recipe: {
    strCategory: string;
  };
  categoryRecipes: {
    idMeal: string;
    strMeal: string;
    strCategory: string;
  }[];
  visibleCategoryRecipes: number;
  handleCategoryClick: (category: string) => void;
}

export default function Sidebar({
                                  recipe,
                                  categoryRecipes,
                                  visibleCategoryRecipes,
                                  handleCategoryClick
                                }: SidebarProps) {
  return (
    <>
      <Heading textAlign={`center`} as="h2" size="md" mb={4}>More in {recipe.strCategory}</Heading>
      <UnorderedList>
        {categoryRecipes.slice(0, visibleCategoryRecipes).map((categoryRecipe) => (
          <ListItem
            border={`1px solid`}
            borderRadius={12}
            p={2}
            mb={2}
            textAlign={`center`}
            listStyleType="none"
            key={categoryRecipe.idMeal}
            color="dark.500"
            cursor="pointer"
            onClick={() => handleCategoryClick(categoryRecipe.strCategory)}
          >
            {categoryRecipe.strMeal}
          </ListItem>
        ))}
      </UnorderedList>
    </>
  );
}