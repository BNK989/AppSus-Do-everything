export function VidNote( note ) {

    return <React.Fragment>
    <h3>{note.info.title}</h3>
    {note.info.txt && <p>{note.info.txt}</p>}
     <iframe src={note.info.vidUrl}  frameBorder="0"  allowFullScreen></iframe>
     </React.Fragment>

  }
