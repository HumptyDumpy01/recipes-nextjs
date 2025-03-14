'use client';

import { Box, Button, Container, Heading, Input, Select } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import LoadingScreen from '@/components/Utils/LoadingScreen';
import RecipeItems from '@/components/Recipes/RecipeItems';
import InfoText from '@/components/Utils/InfoText';

export type Recipe = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export default function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [title, setTitle] = useState('All Recipes');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const itemsPerPage = 8;
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const filterType = searchParams.get('filterType');
        const filterValue = searchParams.get('filterValue');
        let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/recipes`;

        if (filterType && filterValue) {
          url += `?type=${filterType}&value=${filterValue}`;
          setTitle(`${filterValue} Recipes`);
        }

        const response = await axios.get(url);
        setRecipes(response.data.meals || []);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [searchParams]);

  const handleRecipeClick = (id: string) => {
    router.push(`/recipes/${id}`);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    router.push(`/?filterType=${filterType}&filterValue=${filterValue}`);
  };

  const handleClearFilters = () => {
    setFilterType('');
    setFilterValue('');
    setCurrentPage(1);
    router.push('/');
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedRecipes = Array.isArray(recipes) ? recipes.slice(startIndex, startIndex + itemsPerPage) : [];

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Container maxW="container.xl" py={4}>
        <Heading as="h1" size="xl" mb={6}>{title}</Heading>
        <Box as="form" onSubmit={handleFilterSubmit} mb={6} display="flex" gap={4}
             flexWrap={{ base: 'wrap', md: 'nowrap' }}>
          <Select placeholder="Select filter type" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="name">Name</option>
            <option value="ingredient">Ingredient</option>
            <option value="category">Category</option>
            <option value="country">Country</option>
          </Select>
          <Input
            placeholder="Enter filter value"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
        </Box>
        <Box mb={10} display="flex" justifyContent="center" gap={4}>
          <Button type="submit">Filter</Button>
          <Button onClick={handleClearFilters}>Clear Filters</Button>
        </Box>
        {selectedRecipes.length === 0 ? (
          <InfoText text={`No items to be seen!`} />
        ) : (
          <>
            <RecipeItems handleRecipeClick={handleRecipeClick} selectedRecipes={selectedRecipes} />
            <Box display="flex" justifyContent="center" gap={`15px`} mt={4}>
              <Button onClick={handlePreviousPage} isDisabled={currentPage === 1}>Previous</Button>
              <Button onClick={handleNextPage} isDisabled={startIndex + itemsPerPage >= recipes.length}>Next</Button>
            </Box>
          </>
        )}
      </Container>
    </>
  );
}