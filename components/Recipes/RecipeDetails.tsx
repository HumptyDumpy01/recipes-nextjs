'use client';

import {
  Box,
  Button,
  Container,
  Grid,
  Heading,
  Image,
  ListItem,
  OrderedList,
  Spinner,
  Text,
  UnorderedList
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strArea: string;
  strCategory: string;
  ingredients: { name: string; measure: string }[];
}

export default function RecipeDetailsPage() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAllSteps, setShowAllSteps] = useState(false);
  const [categoryRecipes, setCategoryRecipes] = useState<Recipe[]>([]);
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/recipes/${id}`);
        const data = response.data.meals[0];
        const ingredients = [];

        for (let i = 1; i <= 20; i++) {
          const ingredient = data[`strIngredient${i}`];
          const measure = data[`strMeasure${i}`];
          if (ingredient) {
            ingredients.push({ name: ingredient, measure: measure || '' });
          }
        }

        setRecipe({
          idMeal: data.idMeal,
          strMeal: data.strMeal,
          strMealThumb: data.strMealThumb,
          strInstructions: data.strInstructions,
          strArea: data.strArea,
          strCategory: data.strCategory,
          ingredients: ingredients
        });

        // Fetch recipes of the same category
        const categoryResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/recipes?category=${data.strCategory}`);
        setCategoryRecipes(categoryResponse.data.meals);
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (!recipe) {
    return (
      <Container maxW="container.xl" py={4}>
        <Text>Recipe not found.</Text>
      </Container>
    );
  }

  const handleCountryClick = () => {
    router.push(`/?filterType=country&filterValue=${recipe.strArea}`);
  };

  const handleIngredientClick = (ingredient: string) => {
    router.push(`/?filterType=ingredient&filterValue=${ingredient}`);
  };

  const handleCategoryClick = (category: string) => {
    router.push(`/?filterType=category&filterValue=${category}`);
  };

  const instructions = recipe.strInstructions.split('. ').map((sentence, index) => (
    <ListItem key={index} textAlign="left" mt={2} fontSize="lg">
      {sentence.trim() + (sentence.endsWith('.') ? '' : '.')}
    </ListItem>
  ));

  const displayedInstructions = showAllSteps ? instructions : instructions.slice(0, 8);

  return (
    <Container maxW="container.xl" py={4}>
      <Grid templateColumns="300px 1fr 300px" gap={6}>
        <Image src={recipe.strMealThumb} alt={recipe.strMeal} boxSize="300px" objectFit="cover" />
        <Box sx={{ ml: 30 }}>
          <Heading as="h1" size="xl" textAlign="center">{recipe.strMeal}</Heading>
          <Text textAlign="center" color="blue.500" cursor="pointer" onClick={handleCountryClick}>
            {recipe.strArea}
          </Text>
          <Box textAlign="left" mt={4}>
            <Text sx={{ fontSize: 20, fontWeight: 600, textAlign: `center` }}>Instructions:</Text>
            <OrderedList>
              {displayedInstructions}
            </OrderedList>
            {instructions.length > 8 && !showAllSteps && (
              <Button mt={4} onClick={() => setShowAllSteps(true)}>Show More</Button>
            )}
          </Box>
          <Text sx={{ fontSize: 20, fontWeight: 600, mt: 4, mb: 4, textAlign: `center` }}>
            Ingredients:
          </Text>
          <UnorderedList>
            {recipe.ingredients.map((ingredient, index) => (
              <ListItem
                key={index}
                color="blue.500"
                cursor="pointer"
                onClick={() => handleIngredientClick(ingredient.name)}
              >
                {ingredient.measure} {ingredient.name}
              </ListItem>
            ))}
          </UnorderedList>
        </Box>
        <Box sx={{ ml: `auto` }}>
          <Heading as="h2" size="md" mb={4}>More in {recipe.strCategory}</Heading>
          <UnorderedList>
            {categoryRecipes.map((categoryRecipe) => (
              <ListItem
                key={categoryRecipe.idMeal}
                color="blue.500"
                cursor="pointer"
                onClick={() => handleCategoryClick(categoryRecipe.strCategory)}
              >
                {categoryRecipe.strMeal}
              </ListItem>
            ))}
          </UnorderedList>
        </Box>
      </Grid>
    </Container>
  );
}