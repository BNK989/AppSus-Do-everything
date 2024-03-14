//RCS
const { useState, useEffect } = React
const { useParams } = ReactRouter
const { Link, useSearchParams } = ReactRouterDOM

import { NoteList } from '../cmps/NoteList.jsx'
import { NoteEdit } from '../cmps/NoteEdit.jsx'
import { AddNewNote } from '../cmps/AddNewNote.jsx'

import { noteService } from '../services/note.service.js'
import {
  showErrorMsg,
  showSuccessMsg,
  showUserMsg,
} from '../../../services/event-bus.service.js'
export function NoteIndex() {
  //get Notes
  const [notes, setNotes] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const noteId = searchParams.get('id')
  const params = useParams()

  useEffect(() => {
    noteService.query().then((data) => setNotes(data))
  }, [searchParams, noteId])

  const updateUrl = (noteId) => {
    setSearchParams({ id: noteId })
  }

  const onDelete = (id) => {
    const quickCheck = window.confirm(
      'Are you sure you want to delete this note?'
    )
    if (!quickCheck) return
    noteService
      .remove(id)
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

  const onChangeStyle = (id, newStyle) => {
    const note = notes.find((note) => note.id === id)
    console.log(note)
    note.style = newStyle

    noteService
      .update(note.id, note)
      .then(showSuccessMsg('Note color updated'))
      .then(setBgColor(newStyle.backgroundColor))
      .catch((err) => {
        console.error('Could not update note', err)
        showErrorMsg('Failed to update note')
      })
  }

  const togglePin = (id) => {
    return noteService
      .togglePin(id)
      .catch((err) => console.error('Could not toggle pin', err))
  }

  if (!notes) return <div>Loading notes...</div>
  return (
    <React.Fragment>
      {/* {!noteId &&<AddNewNote setNotes={setNotes}/>} */}
      <NoteEdit
        note={notes.find((note) => note.id === noteId)}
        updateUrl={updateUrl}
        onDelete={onDelete}
        onChangeStyle={onChangeStyle}
        togglePin={togglePin}
      />
      <section className="note-index">
        {notes.map((note) => (
          <NoteList
            key={note.id}
            note={note}
            updateUrl={updateUrl}
            setNotes={setNotes}
            onDelete={onDelete}
            togglePin={togglePin}
          />
        ))}
        <div>Note-filter</div>
      </section>
    </React.Fragment>
  )
}
