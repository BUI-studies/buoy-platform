import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

enum FORM_TYPE {
  LESSON = "lesson",
  SENKAN = "senkan",
}

const formLinksMap = {
  [FORM_TYPE.LESSON]:
    "https://docs.google.com/forms/d/e/1FAIpQLSfC2GvH13wSTQxz5sZXcFw9tLiU7X7mxrUBYE7NSUag4g6e4g/viewform?embedded=true",
  [FORM_TYPE.SENKAN]:
    "https://docs.google.com/forms/d/e/1FAIpQLSeU6gQy8NbNgsRvLuDLguuCdDZGrv5q7drXnkrYkxQMsaXbVw/viewform?embedded=true",
  none: "",
}

const Feedback = () => {
  const { type } = useParams()
  const [showForm, setShowForm] = useState(false)
  const formURL: string = formLinksMap[type as FORM_TYPE] || formLinksMap.none
  const handleIframeLoad = () => {
    setShowForm(true)
  }

  useEffect(() => {
    setShowForm(false)
  }, [type])

  return (
    <>
      {!showForm && <span className="">Loading...</span>}

      <iframe
        src={formURL}
        width="100%"
        height="100%"
        onLoad={handleIframeLoad}
        className={`${showForm ? "block" : "hidden"}`}
      >
        <span className="">Loading...</span>
      </iframe>
    </>
  )
}

export default Feedback
