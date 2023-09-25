import { Dispatch, ReactNode, SetStateAction } from 'react'

export type ModalContextProps = {
	modal: null | ReactNode
	setModal: Dispatch<SetStateAction<ReactNode>>
}
