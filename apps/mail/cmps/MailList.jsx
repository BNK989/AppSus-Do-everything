const { useState, useEffect } = React;
import { MailPreview } from "./MailPreview.jsx";

export function MailList(props) {
  const [isLoading, setIsLoading] = useState(true)
  const [emails, setEmails] = useState(null)

  useEffect(() => {
    setEmails(props.emails)
    setIsLoading(false)
    console.log(props.emails)
  }, [])

  if (isLoading) return <div>Loading details..</div>;
  return (
    <div>
      <ul className="preview-list">
        {emails.map((email) => <li key={email.id}>
            <MailPreview email={email} />
          </li>
        )}
      </ul>
    </div>
  )
}

{/* <pre>{email.subject}</pre> */}