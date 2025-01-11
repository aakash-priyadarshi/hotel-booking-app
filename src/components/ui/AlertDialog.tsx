// src/components/ui/AlertDialog.tsx
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { ReactNode } from 'react';

interface AlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  cancelText?: string;
  confirmText?: string;
  children?: ReactNode;
}

export const AlertDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  cancelText = "Cancel",
  confirmText = "Confirm",
}: AlertDialogProps) => {
  return (
    <AlertDialogPrimitive.Root open={isOpen}>
      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <AlertDialogPrimitive.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 shadow-lg z-50 w-[90vw] max-w-[500px]">
          <AlertDialogPrimitive.Title className="text-lg font-semibold mb-2">
            {title}
          </AlertDialogPrimitive.Title>
          <AlertDialogPrimitive.Description className="text-gray-600 mb-6">
            {description}
          </AlertDialogPrimitive.Description>
          <div className="flex justify-end gap-4">
            <AlertDialogPrimitive.Cancel asChild>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                {cancelText}
              </button>
            </AlertDialogPrimitive.Cancel>
            <AlertDialogPrimitive.Action asChild>
              <button
                onClick={onConfirm}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                {confirmText}
              </button>
            </AlertDialogPrimitive.Action>
          </div>
        </AlertDialogPrimitive.Content>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  );
};