import type { Category, Country, Interest, User } from "@/types/UserTypes";
import { fetchApi } from "@/utils/fetchApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type UserPayload = Omit<User, "id" | "createdAt">;

type UsersMutationResponse = {
  users: User[];
};

// API queries and mutations for user-related data
export const UserQueries = {
  countries: ["countries"],
  categories: ["categories"],
  interests: ["interests"],
  users: ["users"],
} as const;


/**
 * countries, categories, and interests queries to fetch the respective lists from the api,
 * uses react-query's useQuery hook to manage the query state and caching.
 * The query key is defined in the UserQueries object,
 * and the query function calls the fetchApi utility to make a
 * GET request to the respective endpoints.
 */

export const useCountriesQuery = () =>
  useQuery({
    queryKey: UserQueries.countries,
    queryFn: () => fetchApi<Country[]>("countries"),
  });

export const useCategoriesQuery = () =>
  useQuery({
    queryKey: UserQueries.categories,
    queryFn: () => fetchApi<Category[]>("categories"),
  });

export const useInterestsQuery = () =>
  useQuery({
    queryKey: UserQueries.interests,
    queryFn: () => fetchApi<Interest[]>("interests"),
  });



/**
 * users query to fetch the list of users from the api, 
 * uses react-query's useQuery hook to manage the query state and caching.
 * The query key is defined in the UserQueries object, and 
 * the query function calls the fetchApi utility to make a GET request to the "users" endpoint.
 *
 * The useMutateUser hook is defined to handle the mutation of user data, 
 * it uses react-query's useMutation hook to manage the mutation state.
 * The mutation function takes a UserPayload object and makes 
 * a POST request to the "users" endpoint using the fetchApi utility.
 * On successful mutation, it updates the users query cache with the new list of users 
 * returned from the API.
 */

export const useUsersQuery = () =>
  useQuery({
    queryKey: UserQueries.users,
    queryFn: () => fetchApi<User[]>("users"),
  });

export const useMutateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user: UserPayload) =>
      fetchApi<UsersMutationResponse>("users", {
        method: "POST",
        body: JSON.stringify(user),
      }),
    onSuccess: (data) => {
      queryClient.setQueryData(UserQueries.users, data.users);
    },
  });
};
