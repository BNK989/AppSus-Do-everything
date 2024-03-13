export function VidNote( note ) {

    return <article className={`note ${note.isPinned ? 'pinned': ''}`}>
    <h3>{note.info.title}</h3>
    {note.info.txt && <p>{note.info.txt}</p>}
     <iframe src={note.info.vidUrl} width="640" height="360" frameBorder="0" allow="autoplay; fullscreen" allowFullScreen></iframe>
       </article>
  }

      // return <article className={`note ${note.isPinned ? 'pinned': ''}`}>
    //     {note.info.imgUrl && <img src={note.info.imgUrl} alt=""/>} 
    //     <h3>{note.info.title}</h3>
    //     {note.info.txt && <p>{note.info.txt}</p>}
    //     {note.info.vidUrl && <iframe src={note.info.vidUrl} width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>}
    //     </article>