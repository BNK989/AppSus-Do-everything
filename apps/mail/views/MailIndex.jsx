const { useState, useEffect,Fragment } = React
const { Link, useSearchParams } = ReactRouterDOM
const { useParams } = ReactRouter;

import {emailService} from "../services/email.service.js"
import { utilService } from "../../../services/util.service.js"

import {MailList} from "../cmps/MailList.jsx"
import {MailSideBar} from "../cmps/MailSideBar.jsx"





export function MailIndex() {
    const [emails, setEmails ]=useState(null)
    const [isLoading, setIsLoading] = useState(true)
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
    function loadEmails(filter) {
        setIsLoading(true)

        emailService.query(filter)
        .then((emailsFromStorage) => {
            emailsFromStorage.map((email)=>email.sentAt = utilService.formatTime(email.sentAt))
            setIsLoading(false)
            setEmails(emailsFromStorage)
            })
            // .then((emailsFromStorage)=>{
                // console.log(emailsFromStorage);
            // })
            // .then(()=>setIsLoading(false))
    }






    if (isLoading) return <div>Loading index..</div>
    return <div className="main-container">
        <MailSideBar/>
        <MailList emails={emails} />
        </div>
}

