import create from 'zustand'
import {ModalType} from '@/types/ModalType'

interface ModalState {
  modalType: ModalType
  setModalType: (ModalType) => void
}

const useModalStore = create<ModalState>((set) => ({
  // modal
  modalType: ModalType.CLOSE,
  setModalType: (ref) => set((state) => ({ modalType: ref })),
}))

export default useModalStore
