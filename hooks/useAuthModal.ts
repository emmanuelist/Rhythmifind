import { create } from "zustand";

interface AuthModalStore {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
};

const useAuthModal = create<AuthModalStore>((Set) => ({
	isOpen: false,
	onOpen: () => Set({ isOpen: true }),
	onClose: () => Set({ isOpen: false }),
}));

export default useAuthModal;