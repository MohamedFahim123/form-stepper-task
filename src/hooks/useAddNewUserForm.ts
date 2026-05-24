"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { UserFormSchema } from "@/validation/user-schema";
import { useForm } from "react-hook-form";
import { selectCompletedSteps } from "@/store/stepper-slice/selectors";
import { selectCurrentStep } from "@/store/stepper-slice/selectors";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  useCountriesQuery,
  useCategoriesQuery,
  useInterestsQuery,
  useMutateUser,
  type UserPayload,
} from "@/services/user.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { userFormSchema } from "@/validation/user-schema";
import type { Country, Category, Interest, Gender } from "@/types/UserTypes";
import {
  resetStepper,
  nextStep,
  prevStep,
} from "@/store/stepper-slice/stepperSlice";

const personalFields: (keyof UserFormSchema)[] = [
  "fullName",
  "email",
  "gender",
  "country",
  "age",
];

const preferenceFields: (keyof UserFormSchema)[] = [
  "category",
  "interests",
  "avatar",
];

/**
 * toOption function converts a Category, Country, or Interest object into an option format with label and value properties.
 * @param item - The item to convert, which can be a Category, Country, or Interest.
 * @returns An object with label and value properties for use in select inputs.
 */
function toOption(item: Category | Country | Interest) {
  return {
    label: item.name,
    value: String(item.id),
  };
}

/**
 * findById function searches for an item in an array of Category, Country, or Interest objects by its id.
 * @param items - The array of items to search through.
 * @param id - The id of the item to find.
 * @returns The item with the matching id, or undefined if not found.
 */
function findById<T extends Category | Country | Interest>(
  items: T[],
  id: string,
) {
  return items.find((item) => String(item.id) === id);
}

/**
 * toUserPayload function converts the form values into a UserPayload object.
 * @param values - The form values.
 * @param countries - The list of countries.
 * @param categories - The list of categories.
 * @param interests - The list of interests.
 * @returns A UserPayload object.
 */
function toUserPayload(
  values: UserFormSchema,
  countries: Country[],
  categories: Category[],
  interests: Interest[],
): UserPayload {
  const category = findById(categories, values.category);
  const selectedInterests = values.interests
    .map((id) => findById(interests, id))
    .filter((interest): interest is Interest => Boolean(interest));

  return {
    fullName: values.fullName,
    email: values.email,
    gender: values.gender as Gender,
    country: values.country
      ? (findById(countries, values.country) ?? null)
      : null,
    age: values.age,
    category: category as Category,
    interests: selectedInterests,
    avatarUrl: values.avatar?.name,
  };
}

export const useAddNewUserForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const currentStep = useAppSelector(selectCurrentStep);
  const completedSteps = useAppSelector(selectCompletedSteps);

  const [success, setSuccess] = useState(false);
  const countriesQuery = useCountriesQuery();
  const categoriesQuery = useCategoriesQuery();
  const interestsQuery = useInterestsQuery();
  const createUser = useMutateUser();

  const form = useForm<UserFormSchema>({
    resolver: zodResolver(userFormSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      gender: undefined,
      country: "",
      age: undefined,
      category: "",
      interests: [],
      avatar: null,
    },
  });

  const countries = countriesQuery.data ?? [];
  const categories = categoriesQuery.data ?? [];
  const interests = interestsQuery.data ?? [];

  // Generate options for select inputs from the fetched data
  const countryOptions = countries.map(toOption);
  const categoryOptions = categories.map(toOption);
  const interestOptions = interests.map(toOption);

  const optionsLoading =
    countriesQuery.isLoading ||
    categoriesQuery.isLoading ||
    interestsQuery.isLoading;
  const countriesLoading = countriesQuery.isLoading;

  const optionsError =
    countriesQuery.isError || categoriesQuery.isError || interestsQuery.isError;

  useEffect(() => {
    dispatch(resetStepper());
  }, [dispatch]);

  /**
   * Navigates to the next step in the form.
   */
  const goNext = async () => {
    const fields = currentStep === 0 ? personalFields : preferenceFields;
    const valid = await form.trigger(fields);
    if (valid) dispatch(nextStep());
  };

  /**
   * Navigates to the previous step in the form.
   */
  const goBack = () => {
    dispatch(prevStep());
  };

  /**
   * Submits the form and creates a new user.
   */
  const submit = form.handleSubmit(async (values) => {
    await createUser.mutateAsync(
      toUserPayload(values, countries, categories, interests),
    );
    dispatch(nextStep());
    setSuccess(true);
  });

  /**
   * Resets the form and stepper state to the initial values, and sets success to false.
   */
  const reset = () => {
    form.reset();
    dispatch(resetStepper());
    setSuccess(false);
  };

  /**
   * Closes the success message and navigates to the users page.
   */
  const closeSuccess = () => {
    setSuccess(false);
    router.push("/users");
  };

  return {
    currentStep,
    completedSteps,
    form,
    countryOptions,
    categoryOptions,
    interestOptions,
    optionsLoading,
    countriesLoading,
    createUser,
    success,
    optionsError,
    goNext,
    goBack,
    submit,
    reset,
    closeSuccess,
  };
};
