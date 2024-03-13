export function ImgNote( note ) {

  return (
    <React.Fragment>
      {note.info.imgUrl && <img src={note.info.imgUrl} alt="" />}
      <h3>{note.info.title}</h3>
      </React.Fragment>
  )
}
