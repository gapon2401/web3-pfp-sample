import { NextApiRequest, NextApiResponse } from 'next'

import { parseRequest } from '@/api/Api'
import { withPatchApi } from '@/api/withPatchApi'
import { mongoClient } from '@/dao/mongoClient'
import { sendEmail } from '@/lib/emailsender'
import { addAccess, checkAccess, removeAccess } from '@/lib/utils'
import { User } from '@/model/usersModel'

type RequestParams = {
  wallet: string
  action: User['status'] | 'admin' | 'unadmin'
}

export default withPatchApi(async (req: NextApiRequest, res: NextApiResponse) => {
  const params = parseRequest<RequestParams>(req)
  const token = req.session.token
  let user = null
  if (token) {
    const userByToken = await mongoClient.getUserByToken(token, true)

    /* Only admins */
    if (userByToken && checkAccess(userByToken.scope, 'admin')) {
      const userToChange = await mongoClient.getUserByWallet(params.wallet, true)
      if (userToChange) {
        const isSuperUser = checkAccess(userByToken.scope, 'superadmin')
        /* Change user status */
        if (
          ['verified', 'pending', 'blocked'].includes(params.action) &&
          (!checkAccess(userToChange.scope, 'admin') || isSuperUser)
        ) {
          const status = params.action as User['status']
          await mongoClient.updateUser(
            { wallet: userToChange.wallet },
            {
              status,
              verified_by: status === 'verified' ? userByToken.wallet : '',
              blocked_by: status === 'blocked' ? userByToken.wallet : '',
            },
          )
          // Send email to account, which is verified
          if (status === 'verified') {
            await sendEmail({
              sender: 'TheSample',
              to: userToChange.email,
              subject: 'Your account is verified',
              text: `
Hi, ${userToChange.name}!

Your account is verified and from now you will be able to take part in the sale of TheSample.

We will inform you, when the sale will start.

Your dashboard address is ${process.env.NEXT_PUBLIC_API_PATH}/dashboard 

---

If you want, you can unsubscribe from the emails, but you will no longer receive emails about the sale and other important information about the collection.
Use link to unsubscribe: %unsubscribe_url%
`,
              html: `
<p>Hi, ${userToChange.name}!</p>
<p>Your account is <b>verified</b> and from now you will be able to take part in the sale of TheSample.</p>
<p>We will inform you, when the presale will start.</p>
<p>Your dashboard address is: 
  <a href='${process.env.NEXT_PUBLIC_API_PATH}/dashboard'>
      ${process.env.NEXT_PUBLIC_API_PATH}/dashboard
  </a>
</p>
<hr />
<p style="color: gray">If you want, you can <a href="%unsubscribe_url%" title="unsubscribe">unsubscribe</a> from the emails, but you will no longer receive emails about the sale and other important information about the collection.</p>`,
            })
          }
        }

        /* Only superadmin can make admins */
        if (isSuperUser && (params.action === 'admin' || params.action === 'unadmin')) {
          await mongoClient.updateUser(
            { wallet: userToChange.wallet },
            {
              scope:
                params.action === 'admin'
                  ? addAccess(userToChange.scope, 'admin')
                  : removeAccess(userToChange.scope, 'admin'),
            },
          )
        }
        user = await mongoClient.getUserByWallet(params.wallet, true)
      }
    }
  }

  res.status(200).json({
    data: user,
  })
})
