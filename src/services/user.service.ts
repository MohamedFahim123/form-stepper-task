import type { Category, Country, Interest, User } from "@/types/UserTypes";
import { fetchApi } from "@/utils/fetchApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createUserAction,
  type UserPayload,
} from "@/actions/userActions";

export type { UserPayload };

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
    queryFn: () => fetchApi<Interest[]>("interests"),
  });

export const useUsersQuery = () =>
  useQuery({
    queryKey: UserQueries.users,
    queryFn: () => fetchApi<User[]>("users"),
  });

export const useMutateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user: UserPayload) => createUserAction(user),
    onSuccess: (users) => {
      queryClient.setQueryData(UserQueries.users, users);
    },
  });
};
