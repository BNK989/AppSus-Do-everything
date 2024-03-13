export function TextNote(note) {
    
    return (
        <React.Fragment>
        <h3>{note.info.title}</h3>
        {note.info.txt && <p>{note.info.txt}</p>}
        </React.Fragment>
    )
  }