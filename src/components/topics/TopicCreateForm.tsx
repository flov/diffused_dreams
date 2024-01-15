"use client";

import { createTopic } from "@/actions";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";

import { useFormState } from "react-dom";
import { FormButton } from "../common/FormButton";

export default function TopicCreateForm() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formState, action] = useFormState(createTopic, { errors: {} });

  return (
    <div className="flex justify-center">
      <Button onPress={onOpen}>Create Topic</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <form action={action} className="flex flex-col gap-4">
                <ModalHeader className="flex flex-col gap-4">
                  Create new topic
                </ModalHeader>
                <ModalBody>
                  <Input
                    name="name"
                    type="text"
                    label="Title"
                    placeholder="Title"
                    labelPlacement="outside"
                    isInvalid={!!formState.errors.name}
                    errorMessage={formState.errors.name?.join(", ")}
                  />
                  <Textarea
                    name="description"
                    label="Description"
                    placeholder="Description"
                    labelPlacement="outside"
                    isInvalid={!!formState.errors.description}
                    errorMessage={formState.errors.description?.join(", ")}
                  />

                  {formState.errors._form && (
                    <div className="rounded p-2 bg-red-500 border border-red-600">
                      {formState.errors._form?.join(", ")}
                    </div>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <FormButton>Create Topic</FormButton>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
