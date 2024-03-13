const { useState } = React

// import { TextNote } from "../cmps/DynamicCmp/TextNote.jsx";
// import { ImgNote } from "../cmps/DynamicCmp/ImgNote.jsx";
// import { VidNote } from "../cmps/DynamicCmp/VidNote.jsx";

import { noteService } from '../services/note.service.js'

export function NoteEdit({note, updateUrl, onDelete}) {

    const [isPinned, setIsPinned] = useState(note.isPinned)

    const togglePin = (id) => {
        console.log(id)
        noteService.togglePin(id)
            .then(() => setIsPinned(prev => !prev))
            .catch((err) => console.error('Could not toggle pin', err))
        
    }

    
    return (
        <article className={`note ${note.isPinned ? 'pinned' : ''}`} style={note.style}>
            <button className='pin-btn' onClick={() => togglePin(note.id)}>{`${isPinned ? 'pinned' : 'Pin'}`}</button>
            <button className='remove-btn' onClick={() => updateUrl('')}>close</button>
            <h3>{note.info.title}</h3>
            {note.info.txt && <p>{note.info.txt}</p>}
            <div className="action-btns">
                <button onClick={() => updateUrl(note.id)} className="edit-btn">Edit</button>
                <button onClick={() =>{onDelete(note.id)}} className="delete-btn">Delete</button>
            </div>
        </article>
    )
}