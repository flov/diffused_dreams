"use client";
import { UserIcon } from "@/icons/UserIcon";
import { paths } from "@/paths";
import { UserEmailVerificationSchema } from "@/schemas/user";
import { joiResolver } from "@hookform/resolvers/joi";
import { Button, CircularProgress, Divider, Input } from "@nextui-org/react";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface ResendVerificationLinkInputs {
  email: string;
}

export default function ResendVerificationLinkForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ResendVerificationLinkInputs>({
    resolver: joiResolver(UserEmailVerificationSchema),
  });

  const [loading, setLoading] = useState(false);
  const [sentVerificationLink, setSentVerificationLink] = useState(false);

  const onSubmit: SubmitHandler<ResendVerificationLinkInputs> = async (
    data
  ) => {
    setLoading(true);

    const res = await fetch(paths.sendVerificationEmail(), {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setSentVerificationLink(true);
    } else {
      toast.error("Error sending verification link, plesae try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center gap-y-2">
      {sentVerificationLink && (
        <div className="bg-green-600 text-white rounded p-3 w-full max-w-72">
          {process.env.NODE_ENV === "development" ? (
            <p>
              In development, the verification link has been logged in the
              console. Please copy and paste it into your browser.
            </p>
          ) : (
            <p>
              A verification link has been sent to your email. Please check your
              inbox and click the link to verify your email.
            </p>
          )}
        </div>
      )}

      {!sentVerificationLink && (
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
                placeholder="EMAIL"
                errorMessage={errors.email?.message}
                isInvalid={Boolean(errors.email)}
                classNames={{
                  inputWrapper: "rounded border-white border-1 p-3 h-11 w-full",
                  input: "ml-4",
                  base: "items-center",
                }}
                startContent={<UserIcon />}
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
              SEND
            </Button>
          )}
        </form>
      )}
    </div>
  );
}
