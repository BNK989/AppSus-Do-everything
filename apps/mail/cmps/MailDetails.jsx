const { useState, useEffect, Fragment } = React;
const { useParams } = ReactRouter;


export function MailDetails(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState(null);

  const params = useParams();

  useEffect(() => {
    
    setEmail(props.email)
    setIsLoading(false);

  }, []);
  if (isLoading && !email) return <div>Loading email..</div>;
  return (
    <div className="mail-details">
      <h1>{email.subject}</h1>
      <h1>{email.body}</h1>
      <h1>{email.sentAt}</h1>
      <h1>{email.from}</h1>
      <h1>{email.to}</h1>
    </div>
  );
}
// id: 'e101',
// subject: 'Miss you!',
// body: 'Would love to catch up sometimes',
// isRead: false,
// sentAt : 1551133930594,
// removedAt : null,
// from: 'momo@momo.com',
// to: 'user@appsus.com'
