//RCS
const { useState } = React

import { ColorInput } from "./ColorInput.jsx";

export function NoteActions({note, togglePin, updateUrl, onDelete, onChangeStyle, onSubmit}) {

    const [isPinned, setIsPinned] = useState(note.isPinned)


    const onPin = (id) => {
        togglePin(id)
        .then(() => {
            console.log('pin function:', id)
            setIsPinned(prev => !prev)
        })
    }

    return (
        <div onClick={(e)=> e.stopPropagation()} className="action-btns btn">
        <button className='pin-btn btn' onClick={() => onPin(note.id)}>{`${isPinned ? 'pinned' : 'Pin'}`}</button>
        <button onClick={() => updateUrl(note.id)} className="edit-btn btn">Edit</button>
        <button onClick={() =>{onDelete(note.id)}} className="delete-btn btn">Delete</button>
        <ColorInput note={note} onChangeStyle={onChangeStyle}/>
        {onSubmit && <button onClick={onSubmit} className="submit-btn btn">Submit</button>}
    </div>
    )
}