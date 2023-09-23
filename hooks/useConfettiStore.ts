import {create} from 'zustand';

type ConfettiState = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useConfettiStore = create<ConfettiState>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}));