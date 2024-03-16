//RCS
const { useState, useEffect } = React
const { useParams } = ReactRouter
const { Link, useSearchParams } = ReactRouterDOM

import { NoteList } from '../cmps/NoteList.jsx'
import { NoteEdit } from '../cmps/NoteEdit.jsx'
import { NoteFilter } from '../cmps/NoteFilter.jsx'
import { AddNewNote } from '../cmps/AddNewNote.jsx'

import { noteService } from '../services/note.service.js'
import {
  eventBusService,
  showErrorMsg,
  showSuccessMsg,
} from '../../../services/event-bus.service.js'
export function NoteIndex() {
  //get Notes
  const [notes, setNotes] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [filterBy, setFilterBy] = useState(noteService.getFilterFromParams(searchParams))
  const noteId = searchParams.get('id')
  const params = useParams()

  useEffect(() => {
    const unsubscribe = eventBusService.on('pin-update', changedNoteId => {
      setTimeout(updateNotes, 999)
    })
    return unsubscribe
  },[])

  useEffect(() => {
    updateNotes()
  }, [searchParams, noteId])

  const onSetFilter = (fieldsToUpdate) => {
    setFilterBy(prev => ({ ...prev, ...fieldsToUpdate }))
    updateNotes(filterBy)
}

  const updateNotes = (filterBy) => {
    noteService.query(filterBy)
    .then((data) => { 
      return noteService.splitByPin(data)
    })
    .then((data) => setNotes(data))
  }

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
    const note = noteService.getNoteById(id)
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

  const getNoteById = (id) => {
    const foundNote = notes.flat().find((note) => note.id === id)
    return foundNote || null
  }

  if (!notes) return <div>Loading notes...</div>
  return (
    <section className="note-app">
      <NoteFilter filterBy={filterBy} onSetFilter={onSetFilter}/>
      <NoteEdit
        note={ getNoteById(noteId)}
        updateUrl={updateUrl}
        onDelete={onDelete}
        onChangeStyle={onChangeStyle}
        togglePin={togglePin}
      />
        <h3 className="pinned-title">Pinned</h3>
      <section className="note-index pinned">
        {notes[0].map((note) => (
          <NoteList
            key={note.id}
            note={note}
            updateUrl={updateUrl}
            setNotes={setNotes}
            onDelete={onDelete}
            togglePin={togglePin}
          />
        ))}
        </section>
        <section className="note-index unpinned">
        {notes[1].map((note) => (
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
    </section>
  )
}
