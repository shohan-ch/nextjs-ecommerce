"use client";

import BaseInputController from "@/componentsBase/form/BaseInputController";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";

const RegisterSchema = z
  .object({
    name: z.string().trim().min(1, "Name is required"),
    email: z.email("Enter a valid email address"),
    mobile: z
      .string()
      .trim()
      .regex(/^\d{11}$/, "Mobile must be exactly 11 digits")
      .or(z.literal("")),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((formData) => formData.password === formData.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormType = z.infer<typeof RegisterSchema>;

export default function Register() {
  const { control, handleSubmit } = useForm<RegisterFormType>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormType> = (formData) => {
    console.info("Register form submitted", {
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile,
      password: formData.password,
    });
  };

  return (
    <Box component="main" className="loginPage">
      <Box className="loginCard">
        <section className="formPanel">
          <Stack
            component="form"
            className="form"
            spacing={2}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <Box className="heading">
              <Typography component="h1" variant="h4">
                Register
              </Typography>
              <Typography color="text.secondary">
                Create an account to get started
              </Typography>
            </Box>
            <BaseInputController control={control} label="Name" name="name" />
            <BaseInputController
              control={control}
              inputType="email"
              label="Email"
              name="email"
            />
            <BaseInputController
              control={control}
              inputType="tel"
              label="Mobile"
              name="mobile"
            />
            <BaseInputController
              control={control}
              inputType="password"
              label="Password"
              name="password"
            />
            <BaseInputController
              control={control}
              inputType="password"
              label="Confirm Password"
              name="confirmPassword"
            />
            <Button type="submit" variant="contained">
              Register
            </Button>
            <Typography variant="body2">
              Already have an account? <Link href="/login">Sign In</Link>
            </Typography>
          </Stack>
        </section>
        <Box className="visualPanel">
          <span className="orbit" aria-hidden="true" />
          <span className="orbit orbitInner" aria-hidden="true" />
          <span className="orbit orbitOuter" aria-hidden="true" />
          <Image
            className="logo"
            src="/logos/logoBlack.svg"
            alt="Shoe store"
            width={250}
            height={73}
          />
        </Box>
      </Box>
    </Box>
  );
}
