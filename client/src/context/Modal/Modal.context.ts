import { createContext, useContext } from "react"

import { ModalContextProps } from "@/context/"

export const ModalContext = createContext<ModalContextProps>({
  modal: null,
  setModal: () => null,
})

export const useModal = () => useContext(ModalContext)
