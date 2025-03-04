// 'use client';

import Recipes from '@/components/Recipes/Recipes';
import ChakraProviderContainer from '@/components/Utils/ChakraProviderContainer';

export default function RecipeList() {
  return (
    <ChakraProviderContainer>
      <Recipes />
    </ChakraProviderContainer>
  );
}