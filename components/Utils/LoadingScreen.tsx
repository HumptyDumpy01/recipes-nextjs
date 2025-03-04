'use client';

/*
type LoadingScreenType = {
  // children: ReactNode;
}
*/

import { Box, Spinner } from '@chakra-ui/react';

export default function LoadingScreen(/*{}: LoadingScreenType*/) {
  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    </>
  );
}
