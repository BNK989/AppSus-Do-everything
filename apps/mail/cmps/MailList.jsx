const { useState, useEffect } = React;
import { MailPreview } from "./MailPreview.jsx";
import {MailDetails} from "./MailDetails.jsx"

export function MailList(props) {
  const [isLoading, setIsLoading] = useState(true)
  const [emails, setEmails] = useState(null)
  const [emailDetail, setEmailDetail] = useState(null)

  

  useEffect(() => {
    setEmails(props.emails)
    setIsLoading(false)
  }, [props.emails])
  
  if (isLoading) return <div>Loading details..</div>;
  return (
    <div>
      {!emailDetail && <ul className="preview-list">
        {emails.map((email) => <li key={email.id}>
            <MailPreview email={email} removeToTrash={props.removeToTrash} setEmailDetail={setEmailDetail}/>
          </li>
        )}
      </ul>}
      {emailDetail && <MailDetails email={emailDetail} folder={'inbox'}/>}
      
    </div>
  )
}
