import { create } from "zustand";

type NewInvoiceState ={
    id?: string;
    isOpen: boolean;
    onOpen: (id: string) => void;
    onClose: () => void;
};

export const UseOpenInvoice = create<NewInvoiceState>((set) => ({
    id: undefined,
    isOpen: false,
    onOpen: (id: string) => set({ isOpen: true, id }),
    onClose: () => set({ isOpen: false, id: undefined }),
}));