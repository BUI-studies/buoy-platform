import { FC, PropsWithChildren, SyntheticEvent } from "react"

import classes from "./Modal.module.scss"

type ModalProps = {
  setModal: (modal: React.ReactNode) => void
}

const Modal: FC<PropsWithChildren & ModalProps> = ({ children, setModal }) => {
  const handleClose = (e: SyntheticEvent) =>
    ((e.target as HTMLElement).classList.contains(classes.modal) ||
      (e.target as HTMLElement).classList.contains(classes.closeBtn)) &&
    setModal(null)

  return (
    <div className={classes.modal} onClick={handleClose}>
      <div className={classes.modalContent}>
        <button className={classes.closeBtn} onClick={handleClose}></button>
        {children}
      </div>
    </div>
  )
}

export default Modal
