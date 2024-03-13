//RCS
const { useState, useEffect } = React

import { NoteList } from '../cmps/NoteList.jsx'

import { noteService  } from '../services/note.service.js'
import { showErrorMsg, showSuccessMsg, showUserMsg } from "../../../services/event-bus.service.js"
export function NoteIndex() {

    //get Notes
    const [notes, setNotes] = useState(null)

    useEffect(() => {
        noteService.query()
        .then(data => {
            console.log(data)
            setNotes(data)
        })
    },[])

    if (!notes) return <div>Loading notes...</div>
    return (
        <React.Fragment>
        <section>
    {/* <NoteList /> */}
    <div>Note-filter</div>
    <div>note-maker</div>
    <div>note-list use columns</div>
    </section>
    </React.Fragment>
    )
}
