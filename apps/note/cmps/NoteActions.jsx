//RCS
import { eventBusService } from "../../../services/event-bus.service.js"

const { useState } = React

import { ColorInput } from "./ColorInput.jsx";

export function NoteActions({note, togglePin, updateUrl, onDelete, onChangeStyle, onSubmit}) {

    const [isPinned, setIsPinned] = useState(note.isPinned)


    const onPin = (id) => {
        togglePin(id)
        .then(() => {
            setIsPinned(prev => !prev)
            //eventBusService.emit('pin-update', id)
        })
        .then(eventBusService.emit('pin-update', id))
    }

    return (
        <div onClick={(e)=> e.stopPropagation()} className="action-btns flex">
        <button className='pin-btn btn' onClick={() => onPin(note.id)}>
            {isPinned && <i className="fa-solid fa-bookmark"></i>}
            {!isPinned && <i className="fa-regular fa-bookmark"></i>}
            </button>
        <button onClick={() => updateUrl(note.id)} className="edit-btn btn"><i className="fa-solid fa-pen-to-square"></i></button>
        <button onClick={() =>{onDelete(note.id)}} className="delete-btn btn"><i className="fa-solid fa-trash-can"></i></button>
        <ColorInput note={note} onChangeStyle={onChangeStyle}/>
        {onSubmit && <button onClick={onSubmit} className="submit-btn btn">Submit</button>}
    </div>
    )
}