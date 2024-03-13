import { TextNote } from "../cmps/DynamicCmp/TextNote.jsx";
import { ImgNote } from "../cmps/DynamicCmp/ImgNote.jsx";
import { VidNote } from "../cmps/DynamicCmp/VidNote.jsx";

export function NoteList({note}) {

    
    return <DynamicCmp cmpType={note} />
    // return <article className={`note ${note.isPinned ? 'pinned': ''}`}>
    //     {note.info.imgUrl && <img src={note.info.imgUrl} alt=""/>} 
    //     <h3>{note.info.title}</h3>
    //     {note.info.txt && <p>{note.info.txt}</p>}
    //     {note.info.vidUrl && <iframe src={note.info.vidUrl} width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>}
    //     </article>
}


    function DynamicCmp(props)  {
        console.log(props.cmpType)
        switch (props.cmpType.type) {
            case 'NoteTxt':
                return <TextNote {...props.cmpType} />
            case 'NoteImg':
                return <ImgNote {...props.cmpType} />
            case 'NoteVid':
                return <VidNote {...props.cmpType} />

        }
}