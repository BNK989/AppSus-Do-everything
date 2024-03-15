const { useState } = React

const { useSearchParams } = ReactRouterDOM

import { TextNote } from "../cmps/DynamicCmp/TextNote.jsx";
import { ImgNote } from "../cmps/DynamicCmp/ImgNote.jsx";
import { VidNote } from "../cmps/DynamicCmp/VidNote.jsx";

import { NoteActions } from "./NoteActions.jsx";
import { noteService } from '../services/note.service.js'
import { showErrorMsg, showSuccessMsg, showUserMsg } from "../../../services/event-bus.service.js"

export function NoteList({note, updateUrl, setNotes, onDelete, togglePin}) {

    const [isPinned, setIsPinned] = useState(note.isPinned)
    const [bgColor, setBgColor] = useState(note.style.backgroundColor)
    const [searchParams, setSearchParams] = useSearchParams()
    const noteId = searchParams.get('id')

    const onChangeStyle = (newStyle) => {
        note.style = newStyle

        noteService.update(note.id, note)
            .then(showSuccessMsg('Note color updated'))
            .then(setBgColor(note.style.backgroundColor))
            .catch((err) => {
                console.error('Could not update note', err)
                showErrorMsg('Failed to update note')
            })

    }

    //console.log('searchid',noteId )

    
    return (
        <article onClick={() => updateUrl(note.id)}className={`note ${isPinned ? 'pinned' : ''} ${noteId === note.id ? 'active' : ''}`} style={{backgroundColor: bgColor}}>
            <DynamicCmp cmpType={note} />
            <NoteActions note={note} updateUrl={updateUrl} onDelete={onDelete} onChangeStyle={onChangeStyle} togglePin={togglePin}/>
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

