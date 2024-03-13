const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

import {emailService} from "../services/email.service.js"
import {MailList} from "../cmps/MailList.jsx"




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
            setEmails(emailsFromStorage)
            setIsLoading(false)
            })
    }
    if (isLoading) return <div>Loading index..</div>
    return <div>
        {/* <pre>{JSON.stringify(emails)}</pre> */}
        <MailList emails={emails} />
        </div>
}

