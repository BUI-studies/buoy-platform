import React, { FC, PropsWithChildren, SyntheticEvent } from "react"

import classes from "./Modal.module.scss"

type ModalProps = {
  setModal: (modal: React.ReactNode) => void
}

const Modal: FC<PropsWithChildren & ModalProps> = ({ children, setModal }) => {
  const handleClose = (e: SyntheticEvent) =>
    (e.target as HTMLElement).classList.contains(classes.modal) &&
    setModal(null)

  return (
    <div className={classes.modal} onClick={handleClose}>
      <div className={classes.modalContent}>{children}</div>
    </div>
  )
}

export default Modal
