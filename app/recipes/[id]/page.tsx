// 'use client';

/*
type RecipeDetailsPageType = {
  // children: ReactNode;
}
*/

import ChakraProviderContainer from '@/components/Utils/ChakraProviderContainer';
import RecipeDetails from '@/components/Recipes/RecipeDetails';

export default function RecipeDetailsPage(/*{}: RecipeDetailsPageType*/) {
  return (
    <>
      <ChakraProviderContainer>
        <RecipeDetails />
      </ChakraProviderContainer>
    </>
  );
}
