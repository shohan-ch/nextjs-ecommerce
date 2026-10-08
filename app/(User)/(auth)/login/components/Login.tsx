"use client";

import BaseInputController from "@/componentsBase/form/BaseInputController";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import styles from "./Login.module.scss";

const LoginSchema = z.object({
  email: z.email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean(),
});

type LoginFormType = z.infer<typeof LoginSchema>;

const Login = () => {
  const { control, handleSubmit } = useForm<LoginFormType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { rememberMe: false },
  });

  const onSubmit: SubmitHandler<LoginFormType> = (formData) => {
    console.info("Login form submitted", {
      email: formData.email,
      rememberMe: formData.rememberMe,
    });
  };

  return (
    <Box component="main" className={styles.loginPage}>
      <Box className={styles.loginCard}>
        <section className={styles.formPanel}>
          <Stack
            component="form"
            className={styles.form}
            spacing={2.5}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <Box className={styles.heading}>
              <Typography component="h1" variant="h4">
                Welcome back
              </Typography>
              <Typography color="text.secondary">
                Sign in to continue to your account
              </Typography>
            </Box>
            <BaseInputController
              control={control}
              inputType="email"
              label="Email"
              name="email"
            />
            <BaseInputController
              control={control}
              inputType="password"
              label="Password"
              name="password"
            />

            <Box className={styles.rememberMe}>
              <BaseInputController
                control={control}
                type="checkbox"
                label="Remember me"
                name="rememberMe"
                checkedItem={false}
              />
            </Box>

            <Button type="submit" variant="contained">
              Sign in
            </Button>
          </Stack>
        </section>
        <Box className={styles.visualPanel}>
          <span className={styles.orbit} aria-hidden="true" />
          <span
            className={`${styles.orbit} ${styles.orbitInner}`}
            aria-hidden="true"
          />
          <span
            className={`${styles.orbit} ${styles.orbitOuter}`}
            aria-hidden="true"
          />
          <Image
            className={styles.logo}
            src="/logos/logoBlack.svg"
            alt="Shoe store"
            width={250}
            height={73}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
