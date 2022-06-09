import { createContext, useState } from "react"

const UtilityContext = createContext()

function UtilityWrapper(props) {

    // todos los estados y funciones
    const [newStoryForm, setNewStoryForm] = useState(false)
    const [profilePic, setProfilePic] = useState(false)

    const utilPassedContext = {
        newStoryForm,
        setNewStoryForm,
        profilePic,
        setProfilePic
    }

    return (
        <UtilityContext.Provider value={utilPassedContext} >
            {props.children}
        </UtilityContext.Provider>
    )
}

export { UtilityContext, UtilityWrapper }


