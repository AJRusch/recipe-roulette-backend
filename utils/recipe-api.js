async function searchRecipes(searchTerm, page) {
  const API_KEY = "c6013385c64948a4a5ca580917d7c99a";

  if (!API_KEY) {
    throw new Error("API key is not found");
  }

  const baseURL = "https://api.spoonacular.com/recipes/complexSearch";
  const url = new URL(baseURL);

  const queryParams = {
    apiKey: API_KEY,
    query: searchTerm,
    number: "12",
    offset: (page * 10).toString(),
  };

  url.search = new URLSearchParams(queryParams).toString();

  try {
    const searchResponse = await fetch(url.toString());
    const results = await searchResponse.json();
    return results;
  } catch (error) {
    console.error(error);
    return null;
  }
}

const getRecipeSummary = async (recipeId) => {
  const API_KEY = "c6013385c64948a4a5ca580917d7c99a";
  if (!API_KEY) {
    throw new Error("API key has not been found");
  }
  const url = new URL(
    `https://api.spoonacular.com/recipes/${recipeId}/summary`
  );

  const params = {
    apiKey: API_KEY,
  };

  url.search = new URLSearchParams(params).toString();
  try {
    const response = await fetch(url.toString());
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = { getRecipeSummary, searchRecipes };
