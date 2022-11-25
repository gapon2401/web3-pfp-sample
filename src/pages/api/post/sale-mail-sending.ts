import { NextApiRequest, NextApiResponse } from 'next'

import { withPostApi } from '@/api/withPostApi'
import { mongoClient } from '@/dao/mongoClient'
import { sendEmail } from '@/lib/emailsender'
import { checkAccess } from '@/lib/utils'

export default withPostApi(async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.session.token
  if (token) {
    const user = await mongoClient.getUserByToken(token, true)
    if (user && checkAccess(user.scope, 'superadmin')) {
      const [users] = await mongoClient.getUsers({
        status: 'verified',
      })

      if (users.length) {
        users.forEach((recipient) => {
          if (recipient.email !== 'nomail') {
            sendEmail({
              sender: 'TheSample',
              to: recipient.email,
              subject: 'Sale of TheSample is opened',
              text: `
Hi, ${recipient.name}!

We are glad to notify you, that the sale of TheSample collection has just started!

You can buy only one on your dashboard: ${process.env.NEXT_PUBLIC_API_PATH}/dashboard 

Thank you for being with us!

---

If you want, you can unsubscribe from the emails, but you will no longer receive emails about the sale and other important information about the collection.
Use link to unsubscribe: %unsubscribe_url%              
              `,
              html: `
<p>Hi, ${recipient.name}!</p>
<p>We are glad to notify you, that the <b>sale of TheSample collection has just started</b>!</p>
<p>You can buy only one on your dashboard: 
  <a href='${process.env.NEXT_PUBLIC_API_PATH}/dashboard'>
      ${process.env.NEXT_PUBLIC_API_PATH}/dashboard
  </a>
</p>
<p>Thank you for being with us!</p>
<hr />
<p style="color: gray">If you want, you can <a href="%unsubscribe_url%" title="unsubscribe">unsubscribe</a> from the emails, but you will no longer receive emails about the sale and other important information about the collection.</p>`,
            }).then()
          }
        })
      }
    }
  }

  res.status(200).json({
    data: true,
  })
})
