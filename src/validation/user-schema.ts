import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

/* User form validation schema */
export const userFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Name is required")
    .min(2, "Must be 2-50 characters")
    .max(50, "Must be 2-50 characters"),

  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address"),

  gender: z.enum(["male", "female"], {
    message: "Gender is required",
  }),

  country: z.string().optional().or(z.literal("")),

  age: z
    .number({
      message: "Age is required",
    })
    .min(18, "Must be between 18-100")
    .max(100, "Must be between 18-100"),

  category: z
    .string({ message: "Category is required" })
    .min(1, "Category is required"),

  interests: z
    .array(z.string({ message: "Invalid interest" }))
    .min(1, "Select at least one interest")
    .max(5, "You can select up to 5 interests"),

  avatar: z
    .custom<File | null>()
    .optional()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
      message: "File size must be less than 5MB",
    })
    .refine(
      (file) => !file || ["image/png", "image/jpeg"].includes(file.type),
      {
        message: "Only PNG and JPG files are allowed",
      },
    ),
});

export type UserFormSchema = z.infer<typeof userFormSchema>;
