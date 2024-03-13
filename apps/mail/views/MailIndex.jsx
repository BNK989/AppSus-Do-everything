const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

import {mailService} from "../services/mail.service"



export function MailIndex() {


    useEffect(()=>{
        // mailService._createMails()

    },[])


    return <div>mail app</div>
}

