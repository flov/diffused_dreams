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
      })
    ),
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    setLoading(true);
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
    setLoading(false);
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
            isInvalid={Boolean(errors.email?.message)}
            placeholder="EMAIL"
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
            placeholder="PASSWORD"
            errorMessage={errors.password?.message}
            isInvalid={Boolean(errors.password?.message)}
            classNames={{
              inputWrapper: "rounded border-white border-1 p-3 h-11 w-full",
              input: "ml-4",
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
            placeholder="CONFIRM PASSWORD"
            errorMessage={errors.confirmPassword?.message}
            isInvalid={Boolean(errors.confirmPassword?.message)}
            type="password"
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
        <Button
          type="submit"
          className="bg-white text-black py-3 text-base font-medium mt-10 w-full rounded"
        >
          CREATE ACCOUNT
        </Button>
      )}
    </form>
  );
}