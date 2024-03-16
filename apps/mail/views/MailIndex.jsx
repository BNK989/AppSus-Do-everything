const { useState, useEffect,Fragment,useRef } = React
const { Link, useSearchParams,Outlet } = ReactRouterDOM
const { useParams } = ReactRouter;

import {emailService} from "../services/email.service.js"
import { utilService } from "../../../services/util.service.js"

import {MailList} from "../cmps/MailList.jsx"
import {MailSideBar} from "../cmps/MailSideBar.jsx"
import {MailSearch} from "../cmps/MailSearch.jsx"
import {MailCompose} from "../cmps/MailCompose.jsx"






export function MailIndex() {
    const [emails, setEmails ]=useState(null)
    const [filteredEmails, setFilteredEmails] = useState(null);
    // const [emails, setEmails] = useState([]);
// const [filteredEmails, setFilteredEmails] = useState([]);
 
    const [isLoading, setIsLoading] = useState(true)
    const currFilter = useRef(null)
    

    const params = useParams();

    useEffect(()=>{
        var filter = (params.folder) ? params.folder : 'inbox'
        emailService.initDev()
        loadEmails(filter)

    },[params])

    function loadEmails(filter) {
        setIsLoading(true);
        emailService.query(filter)
        .then((emailsFromStorage) => {
            emailsFromStorage.map((email) => email.sentAt = utilService.formatTime(email.sentAt));
            setIsLoading(false);
            setEmails(emailsFromStorage)
            setFilteredEmails(emailsFromStorage)

        });
    }
    
    function removeToTrash(id,folder){
        var filteredList = emailService.removeToFolder(id,folder)
        setEmails(filteredList)
      }

    function filterMails({ target }) {
        setFilteredEmails(emails)
        
        const inputValue = target.value.toLowerCase();
        const filteredEmails = emails.filter(
            (email) =>
            email.subject.toLowerCase().includes(inputValue) ||
            email.from.toLowerCase().includes(inputValue)
            );
        setFilteredEmails(filteredEmails);
        
    }
      
    
    if (isLoading) return <div>Loading index..</div>
    return <Fragment>
    <div className="main-container">
        <MailCompose/>
        <MailSearch filterMails={filterMails}/>
        <div className="mail-side-bar">
        <MailSideBar setCurrFilter={currFilter}/>

            </div>        
        {/* {emailDetail&&<Outlet/>} */}
        {!params.id&&<div className="main-list"><MailList emails={filteredEmails} removeToTrash={removeToTrash}/></div>
            }
        </div>
    </Fragment> 
}

