import { create } from "zustand";

interface UploadModalStore {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
};

const useUploadModal = create<UploadModalStore>((Set) => ({
	isOpen: false,
	onOpen: () => Set({ isOpen: true }),
	onClose: () => Set({ isOpen: false }),
}));

export default useUploadModal;