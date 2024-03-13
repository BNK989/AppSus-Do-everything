export function ImgNote( note ) {

  return (
    <article className={`note ${note.isPinned ? 'pinned' : ''}`}>
      {note.info.imgUrl && <img src={note.info.imgUrl} alt="" />}
      <h3>{note.info.title}</h3>
    </article>
  )
}
