// 'use client';

type InfoTextType = {
  text: string;
  // children: ReactNode;
}

import { Box, Text } from '@chakra-ui/react';

export default function InfoText({ text }: InfoTextType) {
  return (
    <>
      <Box textAlign="center" mt={4}>
        <Text>{text}</Text>
      </Box>
    </>
  );
}
