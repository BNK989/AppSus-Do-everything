//RCS
const { useState, useEffect } = React
const { useParams } = ReactRouter
const { Link, useSearchParams } = ReactRouterDOM

import { NoteList } from '../cmps/NoteList.jsx'
import { NoteEdit } from '../cmps/NoteEdit.jsx'

import { noteService  } from '../services/note.service.js'
import { showErrorMsg, showSuccessMsg, showUserMsg } from "../../../services/event-bus.service.js"
export function NoteIndex() {

    //get Notes
    const [notes, setNotes] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const noteId = searchParams.get('id')
    const params = useParams()

    useEffect(() => {
        console.log('noteId:', noteId)
        noteService.query()
        .then(data => setNotes(data))
    },[searchParams,noteId])

    const updateUrl = (noteId) => {
        setSearchParams({ id: noteId })
    }

    const onDelete = (id) => {
        const quickCheck = window.confirm('Are you sure you want to delete this note?')
        if (!quickCheck) return
        noteService.remove(id)
            .then((data) => {
                updateUrl('')
                setNotes(data)
                console.log(data)
                showSuccessMsg('Note removed')
            })
            .catch((err) => {
                console.error('Could not delete note', err)
                showErrorMsg('Could not delete note')
            })
    }



    if (!notes) return <div>Loading notes...</div>
    return (
        <React.Fragment>
            {noteId && <NoteEdit note={notes.find(note => note.id === noteId)} updateUrl={updateUrl} onDelete={onDelete}/>}
        <section className="note-index">

    {notes.map(note => <NoteList key={note.id} note={note} updateUrl={updateUrl} setNotes={setNotes} onDelete={onDelete}/>)}
    <div>Note-filter</div>
    <div>note-maker</div>
    <div>note-list use columns</div>
    </section>
    </React.Fragment>
    )
}
