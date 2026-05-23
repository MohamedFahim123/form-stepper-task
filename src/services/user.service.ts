import { Category, Country, User } from "@/types/UserTypes";
import { fetchApi } from "@/utils/fetchApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type UserPayload = Omit<User, "id" | "createdAt">;
export const UserQueries = {
  countries: ["countries"],
  categories: ["categories"],
  interests: ["interests"],
  users: ["users"],
} as const;

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
    queryFn: () => fetchApi("interests"),
  });

export const useUsersQuery = () =>
  useQuery({
    queryKey: UserQueries.users,
    queryFn: () => fetchApi<User[]>("users"),
  });

export const useMutateUser = () => {
  const queryClient = useQueryClient();

  useMutation({
    mutationFn: (user: UserPayload) =>
      fetchApi("users", {
        method: "POST",
        body: JSON.stringify(user),
      }),
    onSuccess: (data) => {
      queryClient.setQueryData(UserQueries.users, data);
    },
    
  });
};
