import React, { FC } from "react"

type IFrameProps = {
  link: string
  height?: string
}

const IFrame: FC<IFrameProps> = ({ link, height = "60vh" }) => {
  return (
    <div style={{ height }}>
      <iframe src={link} width="100%" height="100%">
        Loading…
      </iframe>
    </div>
  )
}

export default IFrame
