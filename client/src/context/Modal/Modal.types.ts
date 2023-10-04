import { ReactNode, Dispatch, SetStateAction } from 'react'

export type ModalContextProps = {
	modal: null | ReactNode
	setModal: Dispatch<SetStateAction<ReactNode>>
}
