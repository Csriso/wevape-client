import { createContext, useState } from "react"

const UtilityContext = createContext()

function UtilityWrapper(props) {

    // todos los estados y funciones
    const [newStoryForm, setNewStoryForm] = useState(false)

    const utilPassedContext = {
        newStoryForm,
    }

    return (
        <UtilityContext.Provider utilityContext={utilPassedContext} >
            {props.children}
        </UtilityContext.Provider>
    )
}

export { UtilityContext, UtilityWrapper }


