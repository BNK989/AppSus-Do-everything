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
  const placeholderRef = useRef()

  useEffect(() => {
    updateFields()
    if (note.id) setIsActive(true)
    //listToClick()
  }, [note.id, isActive])

  const updateFields = () => {
    setNewNote(note.info)
    if(!note.id){
        h3TitleRef.current.innerText = ''
        pTextRef.current.innerText = ''
        placeholderRef.current.classList.remove('behidden')
    } else {
        h3TitleRef.current.innerText = note.info.title || ''
        placeholderRef.current.classList.add('behidden')
        if (pTextRef.current) pTextRef.current.innerText = note.info.txt
        //
    }
  }

  // const removeTitleForEmptyNote = () => {
  //   if (h3TitleRef.current.innerText === 'Take a note...' && isActive) {
  //     console.log('active:', isActive)
  //     h3TitleRef.current.innerText = ''
  //   }
  // }

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

    if (h3TitleRef.current.innerText !== '') {
      //hide span
      placeholderRef.current.classList.add('behidden')
    }else{
        //show span
        placeholderRef.current.classList.remove('behidden')
    }

    setNewNote((prev) => ({ ...prev, [field]: value }))
  }

  const onSubmit = () => {
    setIsActive(false)
    if(!newNote.title) return 
    note.info = newNote
    noteService
      .update(note.id, note)
      .then((noteData) => {
        return noteData
      })
      .then(()=> updateUrl(Math.floor(Math.random() * 99)))
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
        <div onClick={(e) => {onSubmit();onClose(e)}} className={`backdrop ${isActive ? 'active' : ''}`}></div>
    <article
      onClick={() => setIsActive(true)}
      className={`note-edit flex ${note.isPinned ? 'pinned' : ''} ${
        isActive ? 'active' : ''
      }`}
      style={{ backgroundColor: note.style.backgroundColor }}
    >
      {/* <button
        className="remove-btn btn"
        onClick={(e) => {
          onClose(e)
        }}
      >
        <i className="fa-solid fa-xmark"></i>
      </button> */}
      <h3
        ref={h3TitleRef}
        name="title"
        onInput={handleChange}
        contentEditable
      ></h3><span ref={placeholderRef} className="placeholder">Take a note...</span>
      <div className="create-note-type flex">
        <button onClick={()=>console.log('in dev')} title="Checkbox list" className="btn create-note-type fa fa-check-box"></button>
        <button onClick={()=>console.log('in dev')} title="Paint" className="btn create-note-type fa fa-paintbrush"></button>
        <button onClick={()=>console.log('in dev')} title="Add an image" className="btn create-note-type fa fa-image"></button>
      </div>
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
