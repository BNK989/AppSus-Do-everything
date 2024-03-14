const { useState, useRef, useEffect } = React

import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

import { noteService } from '../services/note.service.js'

export function AddNewNote({setNotes}) {

    const [newNote, setNewNote] = useState(noteService.getBaseNote())
    const [isPinned, setIsPinned] = useState(false)
    const h3Title = useRef()
    const pText = useRef()

    useEffect(() => {
        h3Title.current.innerText = 'Title'
        pText.current.innerText = 'Text'
    },[])

    const togglePin = () => {
        setIsPinned(prev => !prev)
        newNote.isPinned = !newNote.isPinned        
    }

    const handleChange = ({ target }) => {
        const field = target.getAttribute('name')
        const value = target.innerText

        const info = { ...newNote.info, [field]: value }
        setNewNote(prev => ({...prev, info }))
    }

    const onSubmit = () => {
        noteService.post(newNote)
            .then((data)=>{
                console.log('success:',data)
                showSuccessMsg(`Note ${data.info.title} Added`)
                h3Title.current.innerText = 'Title'
                pText.current.innerText = 'Text'
                setNewNote(noteService.getBaseNote())
                setNotes(prev => ([...prev, data]))
            })
            .catch(err => {
                console.log('error adding new note', err)
                showErrorMsg('Failed to add note')
            })
        
    }
    
    console.log(newNote)
    return (
        <article className={`New-note ${newNote.isPinned ? 'pinned' : ''}`} style={newNote.style}>
            <button className='pin-btn btn' onClick={() => togglePin()}>{`${isPinned ? 'pinned' : 'Pin'}`}</button>
            <button className='remove-btn btn' onClick={() => console.log('cancel')}>Cancel</button>
            <h3 ref={h3Title} name="title" onInput={handleChange} contentEditable ></h3>
            <p ref={pText} name="txt" onInput={handleChange} contentEditable ></p>
            <div className="action-btns btn">
                <button onClick={onSubmit} className="submit-btn btn">Submit</button>
            </div>
        </article>
    )
}