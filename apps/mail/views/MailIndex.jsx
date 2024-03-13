const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

import {mailService} from "../services/mail.service.js"



export function MailIndex() {


    useEffect(()=>{
        //mailService._createMails()
        mailService.test()

    },[])


    return <div>mail app</div>
}

