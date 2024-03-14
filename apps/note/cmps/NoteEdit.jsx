const { useState, useRef, useEffect } = React

// import { TextNote } from "../cmps/DynamicCmp/TextNote.jsx";
// import { ImgNote } from "../cmps/DynamicCmp/ImgNote.jsx";
// import { VidNote } from "../cmps/DynamicCmp/VidNote.jsx";
import { showErrorMsg, showSuccessMsg, showUserMsg } from "../../../services/event-bus.service.js"

import { noteService } from '../services/note.service.js'

export function NoteEdit({note, updateUrl, onDelete}) {

    const [isPinned, setIsPinned] = useState(note.isPinned)
    const [newNote, setNewNote] = useState(note.info)
    const h3Title = useRef()
    const pText = useRef()

    useEffect(() => {
        h3Title.current.innerText = newNote.title
        pText.current.innerText = newNote.txt
    },[])

    const togglePin = (id) => {
        console.log(id)
        noteService.togglePin(id)
            .then(() => setIsPinned(prev => !prev))
            .catch((err) => console.error('Could not toggle pin', err))
        
    }

    const handleChange = ({ target }) => {
        const field = target.getAttribute('name')
        const value = target.innerText
        
        setNewNote(prev => ({...prev, [field]: value }))
    }

    const onSubmit = () => {
        note.info = newNote
        noteService.update(note.id, note)
            .then(console.log)
            .then(()=> updateUrl(''))
            .then(showSuccessMsg('Note Updated'))
            .catch(err => {
                console.log('error updating', err)
                showErrorMsg('Failed to Updated note')
            })
        
    }
    
    //console.log(newNote)
    return (
        <article className={`note ${note.isPinned ? 'pinned' : ''}`} style={note.style}>
            <button className='pin-btn btn' onClick={() => togglePin(note.id)}>{`${isPinned ? 'pinned' : 'Pin'}`}</button>
            <button className='remove-btn btn' onClick={() => updateUrl('')}>close</button>
            <h3 ref={h3Title} name="title" onInput={handleChange} contentEditable ></h3>
            {note.info.txt && <p ref={pText} name="txt" onInput={handleChange} contentEditable ></p>}
            <div className="action-btns btn">
                <button onClick={() => updateUrl(note.id)} className="edit-btn btn">Edit</button>
                <button onClick={() =>{onDelete(note.id)}} className="delete-btn btn">Delete</button>
                <button onClick={onSubmit} className="submit-btn btn">Submit</button>
            </div>
        </article>
    )
}