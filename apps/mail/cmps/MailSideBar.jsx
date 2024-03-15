const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM
const { useParams, } = ReactRouter;



export function MailSideBar({setCurrFilter}) {
    const [isLoading, setIsLoading] = useState(true)
    const params = useParams();

    useEffect(()=>{
        setIsLoading(false)

    },[])







    if (isLoading) return <div>Loading side bar..</div>
    return <ul className="mail-side-bar">
        <Link to={`/mail/inbox`}>
            <li onClick={()=>setCurrFilter('inbox')}>Inbox</li>
        </Link>
        <Link to={`/mail/starred`}>
            <li onClick={()=>setCurrFilter('starred')}>Starred</li>
        </Link>
        <Link to={`/mail/trash`}>
            <li>Trash</li>
        </Link>
        </ul>
        
}

