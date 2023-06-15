import React from "react"

import classes from "./Payments.module.scss"

const FormPayment = () => {
  return (
    <div className={classes.formFrame}>
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSd-roigLkj_dzWF0cOLOKyNrPxlU9j30jXSH7KHC5vGiCwFbg/viewform?embedded=true"
        width="100%"
        height="100%"
      >
        Loading…
      </iframe>
    </div>
  )
}

export default FormPayment
