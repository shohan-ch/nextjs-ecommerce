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
    // <Box component="main" className={loginPage}>
    //   <Box className={loginCard}>
    //     <section className={formPanel}>
    //       <Stack
    //         component="form"
    //         className={form}
    //         spacing={2.5}
    //         onSubmit={handleSubmit(onSubmit)}
    //         noValidate
    //       >
    //         <Box className={heading}>
    //           <Typography component="h1" variant="h4">
    //             Welcome back
    //           </Typography>
    //           <Typography color="text.secondary">
    //             Sign in to continue to your account
    //           </Typography>
    //         </Box>
    //         <BaseInputController
    //           control={control}
    //           inputType="email"
    //           label="Email"
    //           name="email"
    //         />
    //         <BaseInputController
    //           control={control}
    //           inputType="password"
    //           label="Password"
    //           name="password"
    //         />

    //         <Box className={rememberMe}>
    //           <Stack direction={"row"} className="flex-between">
    //             <BaseInputController
    //               control={control}
    //               type="checkbox"
    //               label="Remember me"
    //               name="rememberMe"
    //               checkedItem={false}
    //             />

    //             <Typography variant="body2">Forgot Password?</Typography>
    //           </Stack>
    //         </Box>

    //         <Button type="submit" variant="contained">
    //           Sign in
    //         </Button>

    //         <Typography variant="body2">
    //           Don't have an account?{" "}
    //           <Box
    //             component={"span"}
    //             sx={{ color: "blue !important", textDecoration: "underline" }}
    //           >
    //             Sign Up
    //           </Box>
    //         </Typography>
    //       </Stack>
    //     </section>
    //     <Box className={visualPanel}>
    //       <span className={orbit} aria-hidden="true" />
    //       <span
    //         className={`${orbit} ${orbitInner}`}
    //         aria-hidden="true"
    //       />
    //       <span
    //         className={`${orbit} ${orbitOuter}`}
    //         aria-hidden="true"
    //       />
    //       <Image
    //         className={logo}
    //         src="/logos/logoBlack.svg"
    //         alt="Shoe store"
    //         width={250}
    //         height={73}
    //       />
    //     </Box>
    //   </Box>
    // </Box>

    <Box component="main" className={"loginPage"}>
      <Box className={"loginCard"}>
        <section className={"formPanel"}>
          <Stack
            component="form"
            className={"form"}
            spacing={2.5}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <Box className={"heading"}>
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

            <Box className={"rememberMe"}>
              <Stack direction={"row"} className="flex-between">
                <BaseInputController
                  control={control}
                  type="checkbox"
                  label="Remember me"
                  name="rememberMe"
                  checkedItem={false}
                />

                <Typography variant="body2" sx={linkStyle}>
                  Forgot Password?
                </Typography>
              </Stack>
            </Box>

            <Button type="submit" variant="contained">
              Sign in
            </Button>

            <Typography variant="body2">
              Don't have an account?{" "}
              <Box component={"span"} sx={linkStyle}>
                Sign Up
              </Box>
            </Typography>
          </Stack>
        </section>
        <Box className={"visualPanel"}>
          <span className={"orbit"} aria-hidden="true" />
          <span className={`${"orbit"} ${"orbitInner"}`} aria-hidden="true" />
          <span className={`${"orbit"} ${"orbitOuter"}`} aria-hidden="true" />
          <Image
            className={"logo"}
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

const linkStyle = { color: "blue !important", textDecoration: "underline" };
