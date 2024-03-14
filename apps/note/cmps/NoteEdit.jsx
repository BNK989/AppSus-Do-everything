const { useState, useRef, useEffect } = React

import { ColorInput } from "../cmps/ColorInput.jsx";
import { NoteActions } from "../cmps/NoteActions.jsx";

// import { TextNote } from "../cmps/DynamicCmp/TextNote.jsx";
// import { ImgNote } from "../cmps/DynamicCmp/ImgNote.jsx";
// import { VidNote } from "../cmps/DynamicCmp/VidNote.jsx";
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

import { noteService } from '../services/note.service.js'

export function NoteEdit({note, updateUrl, onDelete, togglePin}) {

    if(!note) note = noteService.getEmptyNote()
    console.log(note)

    const [isPinned, setIsPinned] = useState(note.isPinned)
    const [newNote, setNewNote] = useState(note.info)
    const [bgColor, setBgColor] = useState(note.style.backgroundColor)
    const h3Title = useRef()
    const pText = useRef()

    useEffect(() => {
        updateFields()
    },[note.id])
    
    const updateFields = () => {
        setNewNote(note.info)
        h3Title.current.innerText = note.info.title
        if (pText.current) pText.current.innerText = note.info.txt
                
    }

    const onChangeStyle = (newStyle) => {
        note.style = newStyle
        console.log(note.style)

        if(note.id) {
            noteService.update(note.id, note)
            .then(showSuccessMsg('Note color updated'))
            .then(setBgColor(note.style.backgroundColor))
            .catch((err) => {
                console.error('Could not update note', err)
                showErrorMsg('Failed to update note')
            })
        } else {
            //setBgColor(note.style.backgroundColor)
        }

    }

    const handleChange = ({ target }) => {
        const field = target.getAttribute('name')
        const value = target.innerText
        
        setNewNote(prev => ({...prev, [field]: value }))
    }

    const onSubmit = () => {
        note.info = newNote
        noteService.update(note.id, note)
            .then(noteData => {
                return noteData
            })
            .then((noteData)=> {
                if(Date.now() -9000 < noteData.createdAt){
                 updateUrl(noteData.id)
                }else{
                updateUrl('')
                }
            })
            .then(showSuccessMsg('Note Updated'))
            .catch(err => {
                console.log('error updating', err)
                showErrorMsg('Failed to Updated note')
            })
        
    }
    
    //console.log(newNote)
    return (
        <article className={`note ${note.isPinned ? 'pinned' : ''}`} style={{backgroundColor: note.style.backgroundColor}}>
            <button className='remove-btn btn' onClick={() => updateUrl('')}>close</button>
            <h3 ref={h3Title} name="title" onInput={handleChange} contentEditable ></h3>
            {note.info.txt && <p ref={pText} name="txt" onInput={handleChange} contentEditable ></p>}
            <div className="action-btns btn">
                <NoteActions note={note} togglePin={togglePin} updateUrl={updateUrl} onDelete={onDelete} onChangeStyle={onChangeStyle} onSubmit={onSubmit}/>
            </div>
        </article>
    )
}
