const { useState, useEffect,Fragment } = React;

export function MailPreview({ email }) {
  const [isLoading, setIsLoading] = useState(true);
//   const [subject] = email

  useEffect(() => {
      setIsLoading(false);
    //   console.log(email);
    
    
  }, []);

  if (isLoading) return <div>Loading details..</div>;
  return <div>{email.subject}</div>

}
