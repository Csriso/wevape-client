import { createContext, useState } from "react"

const UtilityContext = createContext()

function UtilityWrapper(props) {

    // todos los estados y funciones
    const [newStoryForm, setNewStoryForm] = useState(false)

    const passedContext = {
        newStoryForm,
        setNewStoryForm
    }

    return (
        <UtilityContext.Provider utilityContext={passedContext}>
            {props.children}
        </UtilityContext.Provider>
    )
}

export { UtilityContext, UtilityWrapper }


