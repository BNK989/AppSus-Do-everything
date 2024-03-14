const { useState, useRef, useEffect, Fragment } = React

import { ColorInput } from '../cmps/ColorInput.jsx'
import { NoteActions } from '../cmps/NoteActions.jsx'

// import { TextNote } from "../cmps/DynamicCmp/TextNote.jsx";
// import { ImgNote } from "../cmps/DynamicCmp/ImgNote.jsx";
// import { VidNote } from "../cmps/DynamicCmp/VidNote.jsx";
import {
  showErrorMsg,
  showSuccessMsg,
} from '../../../services/event-bus.service.js'

import { noteService } from '../services/note.service.js'

export function NoteEdit({ note, updateUrl, onDelete, togglePin }) {
  if (!note) note = noteService.getEmptyNote()

  const [isPinned, setIsPinned] = useState(note.isPinned)
  const [newNote, setNewNote] = useState(note.info)
  const [bgColor, setBgColor] = useState(note.style.backgroundColor)
  const [isActive, setIsActive] = useState(!!note.id)
  const h3TitleRef = useRef()
  const pTextRef = useRef()

  useEffect(() => {
    updateFields()
    if (note.id) setIsActive(true)
    //listToClick()
  }, [note.id])

  const updateFields = () => {
    setNewNote(note.info)
    if(!note.id){
        h3TitleRef.current.innerText = 'Add Title'
        pTextRef.current.innerText = 'Add Text'
    } else {
        h3TitleRef.current.innerText = note.info.title
        if (pTextRef.current) pTextRef.current.innerText = note.info.txt
    }
  }

  const onChangeStyle = (newStyle) => {
    note.style = newStyle
    console.log(note.style)

    if (note.id) {
      noteService
        .update(note.id, note)
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

    setNewNote((prev) => ({ ...prev, [field]: value }))
  }

  const onSubmit = () => {
    setIsActive(false)
    note.info = newNote
    noteService
      .update(note.id, note)
      .then((noteData) => {
        return noteData
      })
      .then((noteData) => {
        if (Date.now() - 9000 < noteData.createdAt) {
          updateUrl(noteData.id)
        } else {
          updateUrl('')
        }
      })
      .then(showSuccessMsg('Note Updated'))
      .catch((err) => {
        console.log('error updating', err)
        showErrorMsg('Failed to Updated note')
      })
  }

  const onClose = (e) => {
    e.stopPropagation()
    setIsActive(false)
    updateUrl('')
  }

  //console.log(newNote)
  return (
    <Fragment>
        <div onClick={(e) => {setIsActive(false);onClose(e)}} className={`backdrop ${isActive ? 'active' : ''}`}></div>
    <article
      onClick={() => setIsActive(true)}
      className={`note-edit flex ${note.isPinned ? 'pinned' : ''} ${
        isActive ? 'active' : ''
      }`}
      style={{ backgroundColor: note.style.backgroundColor }}
    >
      <button
        className="remove-btn btn"
        onClick={(e) => {
          onClose(e)
        }}
      >
        <i className="fa-solid fa-xmark"></i>
      </button>
      <h3
        ref={h3TitleRef}
        name="title"
        onInput={handleChange}
        contentEditable
      ></h3>
      {(note.info.txt || !note.id) && (
        <p ref={pTextRef} name="txt" onInput={handleChange} contentEditable={true}></p>
      )}
      {(note.info.imgUrl) && (
        <img name="img" src={note.info.imgUrl} />
      )}
      <div className="action-btns">
        <NoteActions
          note={note}
          togglePin={togglePin}
          updateUrl={updateUrl}
          onDelete={onDelete}
          onChangeStyle={onChangeStyle}
          onSubmit={onSubmit}
        />
      </div>
    </article>
    </Fragment>
  )
}
