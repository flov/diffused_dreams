"use server";

import { z } from "zod";
import { auth } from "@/auth";

import { db } from "@/db";
import { redirect } from "next/navigation";
import { paths } from "@/paths";
import { revalidatePath } from "next/cache";

const createTopicSchema = z.object({
  name: z
    .string()
    .min(1)
    .max(256)
    .regex(/^[a-z0-9-]+$/, {
      message: "Only lowercase letters, numbers, and dashes are allowed.",
    }),
  description: z.string().min(10).max(256),
});

interface CreateTopicFormState {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
}

export const createTopic = async (
  formState: CreateTopicFormState,
  formData: FormData,
): Promise<CreateTopicFormState> => {
  const result = createTopicSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ["You must be signed in to create a topic."],
      },
    };
  }

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  let topic;
  try {
    // wait for 2 seconds
    await new Promise((resolve) => setTimeout(resolve, 2000));
    topic = await db.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description,
      },
    });
  } catch (error) {
    return {
      errors: {
        _form: ["An unexpected error occurred."],
      },
    };
  }

  revalidatePath("/");

  redirect(paths.topicShowPath(topic.slug));
};
