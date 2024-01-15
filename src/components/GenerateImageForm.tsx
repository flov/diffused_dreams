"use client";

import { RunResponse, StatusResponse } from "@/types";
import { Button, Input } from "@nextui-org/react";

import { FormEvent, useEffect, useState } from "react";
import ShowStatus from "@/components/images/ShowStatus";

const GenerateImageForm = () => {
  const [run, setRun] = useState<RunResponse>();
  const [status, setStatus] = useState<StatusResponse>();
  const [prompt, setPrompt] = useState(
    "beautiful lady, (freckles), bright smile, blue eyes, fuzzy messy hair, dark makeup, hyperdetailed photography",
  );

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await fetch("/api/generate-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prompt),
    });
    const runData = (await res.json()) as RunResponse;

    setRun(runData);
    setStatus(undefined);
  };

  useEffect(() => {
    const pollStatus = async () => {
      if (run) {
        let currentStatus = status;
        while (
          currentStatus?.status !== "COMPLETED" &&
          currentStatus?.status !== "FAILED"
        ) {
          const res = await fetch(`/api/status/${run.id}`);
          const statusData = await res.json();
          currentStatus = statusData;
          setStatus(statusData);
          await new Promise((resolve) => setTimeout(resolve, 1000));
          // Wait for 1 second before polling again
        }
      }
    };

    pollStatus();
  }, [run]);

  console.log(run, status);

  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Input
            required={true}
            size="md"
            type="text"
            label="Prompt"
            placeholder="Imagine..."
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
            value={prompt}
          />
        </div>
        <Button
          isLoading={status && status.status !== "COMPLETED"}
          color="primary"
          type="submit"
          size="lg"
        >
          Generate!
        </Button>
      </form>

      <ShowStatus status={status} />
    </>
  );
};

export default GenerateImageForm;
