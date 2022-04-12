import create from 'zustand'
import {subscribeWithSelector} from "zustand/middleware";

interface NodeState {
  currentId: string
  setCurrentId: (string) => void
}

const useNodeStore = create<NodeState>(subscribeWithSelector((set) => ({
  currentId: '',
  setCurrentId: (ref) => set((state) => ({ currentId: ref})),

})))

export default useNodeStore
