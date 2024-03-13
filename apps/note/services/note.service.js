// note service
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
import { showErrorMsg, showSuccessMsg, showUserMsg } from "../../../services/event-bus.service.js"

const NOTE_KEY = 'noteDB'

const noteService = {
    query,
    // MakeNewNote
}

export {noteService}

//functions
function query() {
    return storageService.query(NOTE_KEY)
    .then(notes => {
        if (!notes || !notes.length) {
            notes = demoNotesV2
            console.log('creating demo notes')
            showSuccessMsg('Creating demo notes')
        }
        return notes
    })
}


class MakeNewNote {
  constructor(note) {
    this.createdAt = note.createdAt
    this.type = note.type
    this.isPinned = note.isPinned
    this.style = note.style
    switch (note.type) {
      case 'NoteTxt':
        this.info = note.info
        break
      case 'NoteImg':
        this.info = note.info
        break
      case 'NoteTodos':
        this.info = note.info
        break
      default:
        throw new Error('not supported type')
    }
  }
}

//DemoData
const demoNotes = [
  {
    id: 'n101',
    createdAt: 1112222,
    type: 'NoteTxt',
    isPinned: true,
    style: { backgroundColor: '#00d' },
    info: { txt: 'Fullstack Me Baby!' },
  },
  {
    id: 'n102',
    type: 'NoteImg',
    isPinned: false,
    info: { url: 'http://some-img/me', title: 'Bobi and Me' },
    style: { backgroundColor: '#00d' },
  },
  {
    id: 'n103',
    type: 'NoteTodos',
    isPinned: false,
    info: {
      title: 'Get my stuff together',
      todos: [
        { txt: 'Driving license', doneAt: null },
        { txt: 'Coding power', doneAt: 187111111 },
      ],
    },
  },
]

const demoNotesV2 = [
    {
        "id": "n101",
        "createdAt": 1112222,
        "type": "NoteTxt",
        "isPinned": false,
        "style": {
            "backgroundColor": "#aeccdc"
        },
        "info": {
            "title": "Movie Marathon Night:",
            "txt": "Entire Rambo Trilogy The Starwars Trilogy Harry Potter Trilogy"
        }
    },
    {
        "id": "n102",
        "type": "NoteImg",
        "isPinned": true,
        "info": {
            "imgUrl": "https://static.boredpanda.com/blog/wp-content/uploads/2015/05/tiny-horses-19__605.jpg",
            "title": "Bobi and I! ❤️"
        },
        "style": {
            "backgroundColor": "#e2f6d3"
        }
    },
    {
        "id": "n103",
        "type": "NoteTxt",
        "isPinned": true,
        "info": {
            "title": "New York Travel List:",
            "txt": "12 underwear, 5 short pants, Jean's, 1 suit, Toothbrush, Toothpaste, Razor blade + shaving cream, Cell phone charger + cell phone, Passports Israeli and American."
        },
        "style": {
            "backgroundColor": "#d4e4ed"
        }
    },
    {
        "id": "n104",
        "type": "NoteImg",
        "isPinned": true,
        "info": {
            "imgUrl": "https://www.planetware.com/wpimages/2020/02/new-zealand-in-pictures-beautiful-places-to-photograph-milford-sound.jpg",
            "title": "Next Vacation:"
        },
        "style": {
            "backgroundColor": "#e2f6d3"
        }
    },
    {
        "id": "n105",
        "type": "NoteTxt",
        "isPinned": false,
        "info": {
            "title": "Just so you know",
            "txt": "Risan is a really good project manager! but Yinon is my favorite instructor!"
        },
        "style": {
            "backgroundColor": "#faafa8"
        }
    },
    {
        "id": "n106",
        "type": "NoteImg",
        "isPinned": false,
        "info": {
            "imgUrl": "https://user-images.githubusercontent.com/14011726/94132137-7d4fc100-fe7c-11ea-8512-69f90cb65e48.gif",
            "title": "When you finish a sprint:"
        },
        "style": {
            "backgroundColor": "#fff8b8"
        }
    },
    {
        "id": "n107",
        "type": "NoteTxt",
        "isPinned": true,
        "info": {
            "title": "REMINDER:",
            "txt": "Start working on the final project TODAY!"
        },
        "style": {
            "backgroundColor": "#e2f6d3"
        }
    },
    {
        "id": "n108",
        "type": "NoteVid",
        "isPinned": false,
        "info": {
            "vidUrl": "https://player.vimeo.com/video/293771277",
            "title": "Cats are vicious Creatures🙂"
        },
        "style": {
            "backgroundColor": "#fff8b8"
        }
    }
]



