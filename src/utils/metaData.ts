import { Metadata } from "next";

/*
  Meta data for the Home and Users pages. This includes the title, description, 
  keywords, authors, and creator information for SEO purposes.
*/

export const HOME_META_DATA = {
  title: "User Manager System | React Stepper",
  description:
    "A modern user management system built with Next.js, TypeScript, Tailwind CSS, Redux Toolkit, React Hook Form, TanStack Query, and TanStack Table.",
  keywords: [
    "User Manager System",
    "React Stepper",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "React Hook Form",
    "Redux Toolkit",
    "TanStack Query",
    "TanStack Table",
  ],
  authors: [{ name: "Mohamed Fahim" }],
  creator: "Mohamed Fahim",
} as Metadata;

export const USERS_META_DATA = {
  title: "Users | User Manager System",
  description:
    "View and manage users in the User Manager System.",
  keywords: ["Users", "User Manager System", "View Users", "Manage Users"],
  authors: [{ name: "Mohamed Fahim" }],
  creator: "Mohamed Fahim",
} as Metadata;
