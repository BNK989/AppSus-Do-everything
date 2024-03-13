const { useState } = React

import { TextNote } from "../cmps/DynamicCmp/TextNote.jsx";
import { ImgNote } from "../cmps/DynamicCmp/ImgNote.jsx";
import { VidNote } from "../cmps/DynamicCmp/VidNote.jsx";

import { noteService } from '../services/note.service.js'
import { showErrorMsg, showSuccessMsg, showUserMsg } from "../../../services/event-bus.service.js"

export function NoteList({note, updateUrl, setNotes, onDelete}) {

    const [isPinned, setIsPinned] = useState(note.isPinned)

    const togglePin = (id) => {
        console.log(id)
        noteService.togglePin(id)
            .then(() => setIsPinned(prev => !prev))
            .catch((err) => console.error('Could not toggle pin', err))
        
    }



    
    return (
        <article onClick={() => updateUrl(note.id)}className={`note ${note.isPinned ? 'pinned' : ''}`} style={note.style}>
            <button className='pin-btn btn' onClick={(event) =>{event.stopPropagation() ;togglePin(note.id)}}>{`${isPinned ? 'pinned' : 'Pin'}`}</button>
            <DynamicCmp cmpType={note} />
            <div className="action-btns btn">
                <button onClick={() => updateUrl(note.id)} className="edit-btn btn">Edit</button>
                <button onClick={(event) =>{event.stopPropagation() ;onDelete(note.id)}} className="delete-btn btn">Delete</button>
            </div>
        </article>
    )
}


    function DynamicCmp(props)  {
        switch (props.cmpType.type) {
            case 'NoteTxt':
                return <TextNote {...props.cmpType} />
            case 'NoteImg':
                return <ImgNote {...props.cmpType} />
            case 'NoteVid':
                return <VidNote {...props.cmpType} />

        }
}