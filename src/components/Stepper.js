import '../style/helpers/_stepper.scss'

function Stepper({ activeStep, steps }) {
    return (
        <>
            <ol className="stepper p-3">
                {steps.map((step,i) => {
                    return (
                        <li className="stepper_item" key={i}>
                            <h3 className={`stepper_title mb-3 ${activeStep === i?'active':'' }`}>{i+1}</h3>
                            <p className={`stepper_desc mb-0 ${activeStep === i?'text-primary fw-bold fs-5':'' }`}>{step.title}</p>
                        </li>
                    )
                })}
            </ol>
        </>
    )
}

export default Stepper