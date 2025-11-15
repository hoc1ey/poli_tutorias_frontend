"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useModalStore } from "@/store/ui/modal-store";
import { modalRegistry } from "./modal-registry"

export const ModalRoot = () => {
  const { type, isOpen, props, closeModal } = useModalStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted || !isOpen || !type) return null;

  const ModalComponent = modalRegistry[type];
  if (!ModalComponent) return null;

  const modalElement = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <ModalComponent {...props} onClose={closeModal} />
    </div>
  );

  return createPortal(modalElement, document.body);
};
