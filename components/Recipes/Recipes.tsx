'use client';

import { Box, Button, Container, Grid, GridItem, Heading, Image, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export default function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [title, setTitle] = useState('All Recipes');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const router = useRouter();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/recipes`);
        setRecipes(response.data.meals);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  const handleRecipeClick = (id: string) => {
    router.push(`/recipes/${id}`);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedRecipes = recipes.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <Container maxW="container.xl" py={4}>
        <Heading as="h1" size="xl" mb={6}>{title}</Heading>
        <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6} justifyContent="center"
              alignItems="center">
          {selectedRecipes.map(recipe => (
            <GridItem
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
        <Box display="flex" justifyContent="center" gap={`15px`} mt={4}>
          <Button onClick={handlePreviousPage} isDisabled={currentPage === 1}>Previous</Button>
          <Button onClick={handleNextPage} isDisabled={startIndex + itemsPerPage >= recipes.length}>Next</Button>
        </Box>
      </Container>
    </>
  );
}