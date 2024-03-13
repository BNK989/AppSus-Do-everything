// mail service   
import { utilService } from "../../../services/util.service.js"
// import {storageService} from "../../../services/storage.service.js"
import { storageService } from "../../../services/async-storage.service.js"

const MAIL_KEY = 'mailDB'

export const emailService = {
    createMail,
    getFilterFromParams,
    query,
}

function query(filterBy) {
    console.log('filterBy', filterBy)

    return storageService.query(MAIL_KEY)
        .then(emails => {
            if(filterBy){
                if (filterBy.subject) {
                    const regex = new RegExp(filterBy.subject, 'i')
                    emails = emails.filter(email => regex.test(email.subject))
                }
                if (filterBy.sentAt) {
                    emails = emails.filter(email => email.sentAt >= filterBy.sentAt)
                }
            }
            return emails
        })
}


function _createMails() {
    let mails = storageService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = []

        demoMailList.forEach(mail => {
            mails.push(mail)
        });

        // storageService.saveToStorage(MAIL_KEY, mails) // change to right path
    }
}

function createMail(subject,body,from,to) {
    const mail = getEmptyMail()
    mail.id = utilService.makeId()
    mail.subject = subject
    mail.body = body
    mail.sentAt = Date.now()
    mail.from = from
    mail.to = to
    
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



function getDefaultFilter() {
    return { subject: '',sentAt:'',from:'',}
}

function getFilterFromParams(searchParams = {}) {
    const defaultFilter = getDefaultFilter()
    return {
        subject: searchParams.get('subject') || defaultFilter.subject,
        sentAt: searchParams.get('sentAt') || defaultFilter.sentAt,
        from: searchParams.get('from') || defaultFilter.from
    }
}


const criteria = {
    status: 'inbox/sent/trash/draft',
    txt: 'puki', // no need to support complex text search
    isRead: true,
    // (optional property, if missing: show all)
    isStared: true, // (optional property, if missing: show all)
    lables: ['important', 'romantic'] // has any of the labels
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