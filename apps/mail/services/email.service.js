// mail service
import { utilService } from "../../../services/util.service.js";
// import {storageService} from "../../../services/storage.service.js"
import { storageService } from "../../../services/async-storage.service.js";

const MAIL_KEY = "mailDB";
var gEmails;

export const emailService = {
  createMail,
  getFilterFromParams,
  query,
  initDev,
  getEmailById,
  removeToFolder
};

function removeToFolder(id,moveToFolder){
  console.log(id);
  var newList = storageService.query(MAIL_KEY).then((emails)=>{
    emails.map((email)=>{
      if (email.id === id)email.folder = moveToFolder
    })
  })
  console.log(id);
  return newList

}

function initDev() {
  storageService._save(MAIL_KEY, demoMailList);
}

function query(filterBy) {
  if(gEmails) return gEmails
  console.log("filterBy", filterBy);

  return storageService.query(MAIL_KEY).then((emails) => {
    if(filterBy==='inbox')return emails.filter((email)=>email.folder === filterBy)
    if(filterBy=== 'starred')return emails.filter((email)=>email.isStared === true)
    else return emails   
    
    })
    // if (filterBy) {
    //   if (filterBy.subject) {
    //     const regex = new RegExp(filterBy.subject, "i");
    //     emails = emails.filter((email) => regex.test(email.subject));
    //   }
    //   if (filterBy.sentAt) {
    //     emails = emails.filter((email) => email.sentAt >= filterBy.sentAt);
    //   }
    // }
    // return emails;
  
}

function _createMails() {
  let mails = storageService.loadFromStorage(MAIL_KEY);
  if (!mails || !mails.length) {
    mails = [];

    demoMailList.forEach((mail) => {
      mails.push(mail);
    });
  }
}

function createMail(subject, body, from, to) {
  const mail = getEmptyMail();
  mail.id = utilService.makeId();
  mail.subject = subject;
  mail.body = body;
  mail.sentAt = Date.now();
  mail.from = from;
  mail.to = to;

  return mail;
}

function getEmptyMail() {
  return {
    id,
    subject,
    body,
    isRead: false,
    sentAt,
    removedAt: null,
    from,
    to,
  };
}

function getDefaultFilter() {
  return { subject: "", sentAt: "", from: "" };
}

function getFilterFromParams(searchParams = {}) {
  const defaultFilter = getDefaultFilter();
  return {
    subject: searchParams.get("subject") || defaultFilter.subject,
    sentAt: searchParams.get("sentAt") || defaultFilter.sentAt,
    from: searchParams.get("from") || defaultFilter.from,
  };
}

function getEmailById(id) {
  console.log(id);
  return storageService
    .get(MAIL_KEY, id)
    // .then((mail) => console.log(mail))
    // .then((mail) => _setNextPrevMailId(id));
//   return id;
}
const criteria = {
  status: "inbox/sent/trash/draft",
  txt: "puki", // no need to support complex text search
  isRead: true,
  // (optional property, if missing: show all)
  isStared: true, // (optional property, if missing: show all)
  lables: ["important", "romantic"], // has any of the labels
};

const demoMailList = [
  {
    id: "e101",
    subject: "Miss you!",
    body: "Would love to catch up sometimes",
    isRead: false,
    isChecked: false,
    sentAt: 1551133930594,
    removedAt: null,
    from: "momo@momo.com",
    to: "user@appsus.com",
    folder:'inbox',
    isStared: true
  },
  {
    id: "e102",
    subject: "Miss me!",
    body: "Would love to catch up sometimes",
    isRead: true,
    isChecked: false,
    sentAt: 1710351939000,
    removedAt: null,
    from: "bobo@bobo.com",
    to: "user@appsus.com",
    folder:'inbox',
    isStared: false,
  },
  {
    id: "e103",
    subject: "Miss her!",
    body: "Would love to catch up sometimes",
    isRead: false,
    isChecked: false,
    sentAt: 1551133930594,
    removedAt: null,
    from: "dodo@dodo.com",
    to: "user@appsus.com",
    folder:'inbox',
    isStared: true,
  },
  {
    id: "e104",
    subject: "Miss he!",
    body: "Would love to catch up sometimes",
    isRead: false,
    isChecked: false,
    sentAt: 1551133930594,
    removedAt: null,
    from: "tal@dodo.com",
    to: "user@appsus.com",
    folder:'inbox',
    isStared: false,
  },
  {
    id: "e105",
    subject: "Help!",
    body: "Would love to catch up sometimes",
    isRead: false,
    isChecked: false,
    sentAt: 1551133930594,
    removedAt: null,
    from: "tal@dodo.com",
    to: "user@appsus.com",
    folder:'inbox',
    isStared: false,
  },
  {
    id: "e106",
    subject: "don't replay!",
    body: "Would love to catch up sometimes",
    isRead: false,
    isChecked: false,
    sentAt: 1551133930594,
    removedAt: null,
    from: "tal@dodo.com",
    to: "user@appsus.com",
    folder:'inbox',
    isStared: false,
  },
];
