const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

import {emailService} from "../services/email.service.js"




export function MailIndex() {
    const [emails, setEmails ]=useState(null)
    const [isLoading, setIsLoading] = useState(true)
    // const [searchParams, setSearchParams] = useSearchParams(null)
    // const [filterBy, setFilterBy] = useState(emailService.getFilterFromParams(searchParams))

    useEffect(()=>{
        // setSearchParams(filterBy)
        loadEmails()

    },[])
    function loadEmails() {
        setIsLoading(true)
        
        
        emailService.query()
        .then((emailsFromStorage) => {
            setEmails(emailsFromStorage)
            setIsLoading(false)
            console.log(emailsFromStorage);
            })
    }
    if (isLoading) return <div>Loading details..</div>
    return <div>
        mail app
        <pre>{JSON.stringify(emails)}</pre>
        </div>
}

