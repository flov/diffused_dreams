"use client";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { UserRegisterSchema } from "@/schemas/user";
import { Button, CircularProgress, Input } from "@nextui-org/react";
import { UserIcon } from "@/icons/UserIcon";
import { LockIcon } from "@/icons/LockIcon";
import Joi from "joi";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState } from "react";

interface RegisterFormInputs {
  email: string;
  password: string;
  confirmPassword: string;
}

export function RegisterForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: joiResolver(
      UserRegisterSchema.append({
        confirmPassword: Joi.any()
          .valid(Joi.ref("password"))
          .required()
          .messages({
            "any.only": "Passwords don't match",
            "any.required": "Confirm Password is a required field",
          }),
      }),
    ),
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    setIsLoading(true);
    const res = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    if (!res.ok) {
      const { error } = await res.json();

      toast.error(error, {
        position: "bottom-right",
        theme: "colored",
      });
    } else {
      router.push("/register/success");
    }
    setIsLoading(false);
  };

  return (
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
            errorMessage={errors.email?.message}
            color="primary"
            isInvalid={Boolean(errors.email?.message)}
            placeholder="Email"
            classNames={{
              mainWrapper: "w-96",
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
            color="primary"
            type="password"
            placeholder="Password"
            errorMessage={errors.password?.message}
            isInvalid={Boolean(errors.password?.message)}
            classNames={{
              mainWrapper: "w-96",
              base: "items-center",
            }}
            startContent={<LockIcon />}
          />
        )}
      />
      <Controller
        name="confirmPassword"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            variant={"bordered"}
            placeholder="Confirm password"
            errorMessage={errors.confirmPassword?.message}
            color="primary"
            isInvalid={Boolean(errors.confirmPassword?.message)}
            type="password"
            classNames={{
              mainWrapper: "w-96",
              base: "items-center",
            }}
            startContent={<LockIcon />}
          />
        )}
      />

      {isLoading ? (
        <CircularProgress
          color="primary"
          className="py-3 mt-10"
          aria-label="Loading..."
        />
      ) : (
        <Button
          type="submit"
          color="secondary"
          className="py-3 text-base font-medium mt-10 w-full rounded"
        >
          Create account
        </Button>
      )}
    </form>
  );
}
