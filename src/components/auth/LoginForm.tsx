"use client";
import { LockIcon } from "@/icons/LockIcon";
import { UserIcon } from "@/icons/UserIcon";
import { Button, CircularProgress, Divider, Input } from "@nextui-org/react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { GoogleIcon } from "@/icons/GoogleLogoIcon";
import { signInWithGoogle } from "@/actions";
import { useSearchParams } from "next/navigation";
import { EMAIL_NOT_VERIFIED } from "@/errors/customErrorTypes";

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function LoginForm() {
  const { handleSubmit, control } = useForm<LoginFormInputs>();

  const params = useSearchParams();
  const logInError = params.get("error");
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setLoading(true);
    signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: true,
      callbackUrl: "/",
    });

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center gap-y-2">
      {logInError && (
        <div className="bg-red-700 text-white rounded p-3 w-full max-w-72">
          {logInError === EMAIL_NOT_VERIFIED ? (
            <p>
              Email is not verified. Please verify it in your email or click
              <Link href="/verify-email/resend" className="text-purple-600">
                {" "}
                here{" "}
              </Link>
              to resend the verification link.
            </p>
          ) : (
            <p>Email or password is wrong</p>
          )}
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-2 w-full max-w-72 items-center justify-center "
      >
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              variant={"bordered"}
              color="primary"
              placeholder="Email"
              classNames={{
                inputWrapper: "rounded border-white border-1 p-3 h-11 w-full",
                input: "ml-4",
                base: "items-center",
              }}
              startContent={<UserIcon />}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              variant={"bordered"}
              type="password"
              color="primary"
              placeholder="Password"
              classNames={{
                inputWrapper: "rounded border-white border-1 p-3 h-11 w-full",
                input: "ml-4",
                base: "items-center",
              }}
              startContent={<LockIcon />}
            />
          )}
        />

        {loading ? (
          <CircularProgress
            color="primary"
            className="py-3 mt-10"
            aria-label="Loading..."
          />
        ) : (
          <>
            <Button
              type="submit"
              className="bg-white text-black py-3 text-base font-medium mt-10 w-full rounded"
            >
              LOGIN
            </Button>
            {/* <p className="text-white text-xl">OR</p> */}
            {/* <Button
              onClick={() => {
                setLoading(true);
                signInWithGoogle();
              }}
              type="button"
              className="bg-white text-black py-3 text-base font-medium  w-full rounded"
            >
              <GoogleIcon /> Sign in with Google
            </Button> */}
          </>
        )}
      </form>

      <div className="flex justify-center w-full">
        {/* todo implement forgot password */}
        <Link href="/">
          <p className="text-white text-base">Forgot password?</p>
        </Link>
      </div>
      <Button
        className="text-base font-medium text-white rounded border-white border-1 mt-5 py-2 min-w-36"
        variant="bordered"
        as={Link}
        href="/register"
      >
        Register
      </Button>
    </div>
  );
}
