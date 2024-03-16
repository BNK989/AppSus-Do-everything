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
    const [isLoading, setIsLoading] = useState(true)
    // const [currFilter, setCurrFilter] = useState('inbox')
    const currFilter = useRef(null)
    

    const params = useParams();
    // const [searchParams, setSearchParams] = useSearchParams(null)
    // const [filterBy, setFilterBy] = useState(emailService.getFilterFromParams(searchParams))

    useEffect(()=>{
        var filter = (params.folder) ? params.folder : 'inbox'
        console.log('params',params.folder);
        // setSearchParams(filterBy)
        emailService.initDev()
        loadEmails(filter)

    },[params])

    useEffect(()=>{
        console.log(currFilter);
    },[currFilter])


    function loadEmails(filter) {
        setIsLoading(true)

        emailService.query(filter)
        .then((emailsFromStorage) => {
            emailsFromStorage.map((email)=>email.sentAt = utilService.formatTime(email.sentAt))
            setIsLoading(false)
            setEmails(emailsFromStorage)
            })
 
    }
    
    function removeToTrash(id,folder){
        console.log(id);
        console.log(folder);
        var filteredList = emailService.removeToFolder(id,folder)
        setEmails(filteredList)
      }
    if (isLoading) return <div>Loading index..</div>
    return <Fragment>
    <div className="main-container">
        <MailCompose/>
        <MailSearch/>
        <div className="mail-side-bar">
        <MailSideBar setCurrFilter={currFilter}/>

            </div>        
        {/* {emailDetail&&<Outlet/>} */}
        {!params.id&&<div className="main-list"><MailList emails={emails} removeToTrash={removeToTrash}/></div>
            }
        </div>
    </Fragment> 
}

