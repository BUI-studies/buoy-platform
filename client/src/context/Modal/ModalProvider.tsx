import { FC, PropsWithChildren, ReactNode, useState } from 'react'

import { ModalContext } from '@/context'
import { Modal } from '@/components'

const ModalProvider: FC<PropsWithChildren> = ({ children }) => {
	const [modal, setModal] = useState<ReactNode | null>(null)

	return (
		<ModalContext.Provider value={{ modal, setModal }}>
			{children}
			{modal && <Modal setModal={setModal}>{modal}</Modal>}
		</ModalContext.Provider>
	)
}

export default ModalProvider
