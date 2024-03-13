const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

import {emailService} from "../services/email.service.js"
import {MailList} from "../cmps/MailList.jsx"
import { utilService } from "../../../services/util.service.js"





export function MailIndex() {
    const [emails, setEmails ]=useState(null)
    const [isLoading, setIsLoading] = useState(true)
    // const [searchParams, setSearchParams] = useSearchParams(null)
    // const [filterBy, setFilterBy] = useState(emailService.getFilterFromParams(searchParams))

    useEffect(()=>{
        // setSearchParams(filterBy)
        emailService.initDev()
        loadEmails()

    },[])
    function loadEmails() {
        setIsLoading(true)

        emailService.query()
        .then((emailsFromStorage) => {
            // console.log(emailsFromStorage);
            emailsFromStorage.map((email)=>email.sentAt = utilService.formatTime(email.sentAt))
            setEmails(emailsFromStorage)
            setIsLoading(false)
            // console.log(emailsFromStorage);
            // setEmails(emailsFromStorage)
            })
            // .then((emailsFromStorage)=>setEmails(emailsFromStorage))
            // .then(()=>setIsLoading(false))
    }






    if (isLoading) return <div>Loading index..</div>
    return <div>
        {/* <pre>{JSON.stringify(emails)}</pre> */}
        <MailList emails={emails} />
        </div>
}

