// 'use client';

import Recipes from '@/components/Recipes/Recipes';
import ChakraProviderContainer from '@/components/Utils/ChakraProviderContainer';
import { Suspense } from 'react';
import LoadingScreen from '@/components/Utils/LoadingScreen';

export default function RecipeList() {
  return (
    <ChakraProviderContainer>
      <Suspense fallback={<LoadingScreen />}>
        <Recipes />
      </Suspense>
    </ChakraProviderContainer>
  );
}