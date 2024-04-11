// components/common/Modal.tsx
import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

interface ModalProps {
  title: string;
  body: React.ReactNode;
  buttonTitle: string;
  onCloseAction?: () => void;
  onPrimaryAction?: () => void;
}

const DialogModal: React.FC<ModalProps> = ({ title, body, buttonTitle, onCloseAction, onPrimaryAction }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen}>{buttonTitle}</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>
                {body}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={() => {
                  onCloseAction?.();
                  onClose();
                }}>
                  Close
                </Button>
                <Button color="primary" onPress={() => {
                  onPrimaryAction?.();
                  onClose();
                }}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DialogModal;
