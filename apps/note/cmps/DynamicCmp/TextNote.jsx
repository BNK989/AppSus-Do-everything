export function TextNote(note) {
    
    return (
      <article className={`note ${note.isPinned ? 'pinned' : ''}`} style={note.style}>
        <h3>{note.info.title}</h3>
        {note.info.txt && <p>{note.info.txt}</p>}
      </article>
    )
  }