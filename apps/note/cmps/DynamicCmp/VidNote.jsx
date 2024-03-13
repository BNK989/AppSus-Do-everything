export function VidNote( note ) {

    return <article className={`note ${note.isPinned ? 'pinned': ''}`}>
    <h3>{note.info.title}</h3>
    {note.info.txt && <p>{note.info.txt}</p>}
     <iframe src={note.info.vidUrl}  frameBorder="0"  allowFullScreen></iframe>
       </article>
  }
