const { Route, Routes } = ReactRouterDOM;
const Router = ReactRouterDOM.HashRouter;

import { AppHeader } from "./cmps/AppHeader.jsx";
import { About } from "./views/About.jsx";
import { Home } from "./views/Home.jsx";
import { MailIndex } from "./apps/mail/views/MailIndex.jsx";
import { NoteIndex } from "./apps/note/views/NoteIndex.jsx";

import { MailDetails } from "./apps/mail/cmps/MailDetails.jsx";
import { UserMsg } from "cmps/UserMsg.jsx";

export function App() {
  return (
    <Router>
      <section className="app">
        <AppHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* <Route path='/mail/:folder' element={<MailIndex />}/> */}
          <Route path="/mail/:folder" element={<MailIndex />} />
          <Route path="/mail/:folder/:id" element={<MailDetails />} />
          <Route path="/note" element={<NoteIndex />} />
        </Routes>
      </section>
      <UserMsg />
    </Router>
  );
}

{
  /* <Route
  path='/mail/:folder/:mailId'
  element={<MailDetails />}
/> */
}
