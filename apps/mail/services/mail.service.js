// mail service   
import { utilService } from "../../../services/util.service"
// import {asyncStorage} from "../../../services/async-storage.service"
import {storageService} from "../../../services/storage.service"

const MAIL_KEY = 'mailDB'

export const mailService = {
    _createMails,
}



console.log('dd');
function _createMails() {
    let mails = storageService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = []

        // demoMailList.map((mail)=>{
        //     console.log(mail);
        //     return mail
        // })

        // demoMailList.forEach(element => {
            // console.log(element);
        // });

        // mails.push(_createMails('audu', 300))
        // mails.push(_createMails('fiak', 120))
        // mails.push(_createMails('subali', 50))
        // mails.push(_createMails('mitsu', 150))
        // mails.push(_createMails('audu', 300))
        // mails.push(_createMails('fiak', 120))
        // mails.push(_createMails('subali', 50))
        // mails.push(_createMails('mitsu', 150))
        // storageService.saveToStorage(MAIL_KEY, mails)
    }
}

function _createMails() {
    const mail = getEmptyMail(vendor, maxSpeed)
    mail.id = utilService.makeId()
    
    return mail
}

function getEmptyMail() {
    return     {
        id,
        subject,
        body,
        isRead: false,
        sentAt,
        removedAt : null,
        from,
        to
        }
}


function fillMail(){
    
}


const demoMailList = [
    {
        id: 'e101',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt : 1551133930594,
        removedAt : null,
        from: 'momo@momo.com',
        to: 'user@appsus.com'
        },
    {
        id: 'e102',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt : 1551133930594,
        removedAt : null,
        from: 'bobo@bobo.com',
        to: 'user@appsus.com'
        },
    {
        id: 'e103',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt : 1551133930594,
        removedAt : null,
        from: 'dodo@dodo.com',
        to: 'user@appsus.com'
        },
]