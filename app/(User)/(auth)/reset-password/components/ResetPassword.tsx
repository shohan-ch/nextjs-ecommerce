"use client";

import BaseInputController from "@/componentsBase/form/BaseInputController";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";

const ResetPasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((formData) => formData.password === formData.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormType = z.infer<typeof ResetPasswordSchema>;

export default function ResetPassword() {
  const { control, handleSubmit } = useForm<ResetPasswordFormType>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const onSubmit: SubmitHandler<ResetPasswordFormType> = (formData) => {
    console.info("Password reset form submitted", {
      passwordProvided: Boolean(formData.password),
      passwordsMatch: formData.password === formData.confirmPassword,
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
                Reset Password
              </Typography>
              <Typography color="textSecondary">
                Choose a new password for your account
              </Typography>
            </Box>
            <BaseInputController
              control={control}
              inputType="password"
              label="New Password"
              name="password"
            />
            <BaseInputController
              control={control}
              inputType="password"
              label="Confirm Password"
              name="confirmPassword"
            />
            <Button type="submit" variant="contained">
              Reset Password
            </Button>
            <Typography variant="body2">
              <Link href="/login">Back to Sign In</Link>
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
