"use client";

import BaseInputController from "@/componentsBase/form/BaseInputController";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";

const ForgotPasswordSchema = z.object({
  email: z.email("Enter a valid email address"),
});

type ForgotPasswordFormType = z.infer<typeof ForgotPasswordSchema>;

export default function ForgotPassword() {
  const { control, handleSubmit } = useForm<ForgotPasswordFormType>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const onSubmit: SubmitHandler<ForgotPasswordFormType> = (formData) => {
    console.info("Password reset requested", { email: formData.email });
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
                Forgot Password
              </Typography>
              <Typography color="textSecondary" variant="body2">
                Enter your email to reset your password
              </Typography>
            </Box>
            <BaseInputController
              control={control}
              inputType="email"
              label="Email"
              name="email"
            />
            <Button type="submit" variant="contained">
              Send Reset Link
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
