const { useState, useEffect } = React;
const { Link, useSearchParams } = ReactRouterDOM;
const { useParams } = ReactRouter;

export function MailSideBar({ setCurrFilter ,currFilter}) {
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) return <div>Loading side bar..</div>;
  return (
    <ul className="mail-side-bar">
      <Link to={`/mail/inbox`}>
        {/* <i className="fa-solid fa-trash inline"></i> */}
        <li className="inline" onClick={() => setCurrFilter("inbox")}>
          Inbox
        </li>
      </Link>
      <Link to={`/mail/starred`}>
        {/* <li onClick={() => setCurrFilter("starred")}>Starred</li> */}
        <li onClick={() => currFilter = "starred"}>Starred</li>
      </Link>
      <Link to={`/mail/trash`}>
        <li>Trash</li>
      </Link>
    </ul>
  );
}
