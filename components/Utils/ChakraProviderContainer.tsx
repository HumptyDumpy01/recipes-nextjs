'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface ChakraProviderContainerProps {
  children: ReactNode;
}

export default function ChakraProviderContainer({ children }: ChakraProviderContainerProps) {
  return <ChakraProvider>{children}</ChakraProvider>;
}
