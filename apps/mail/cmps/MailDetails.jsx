const { useState, useEffect, Fragment } = React;



export function MailDetails(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState(null);

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

