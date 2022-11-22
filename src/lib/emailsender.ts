import { doRequest } from '@/api/Api'

type Props = {
  sender: string
  to: string
  subject: string
  html: string
  text: string
}

/* Server-side function */
export const sendEmail = async ({ sender, to, subject, html, text }: Props) => {
  const from = process.env.MAILGUN_FROM
  const fullHtml = `
  <!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width,initial-scale=1 user-scalable=yes">
<meta content="telephone=no" name="format-detection">
<meta name="x-apple-disable-message-reformatting">
<title></title>
<!--[if mso]> <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
<![endif]-->
</head>
<body>
${html}
</body>
</html>
  `

  return process.env.MAILGUN_API_KEY && process.env.MAILGUN_DOMAIN
    ? await doRequest({
        external: true,
        method: 'POST',
        endpoint: `${process.env.MAILGUN_DOMAIN}messages`,
        params: {
          params: { from: `${sender} <${from}>`, to, subject, text, html: fullHtml },
          auth: {
            username: 'api',
            password: process.env.MAILGUN_API_KEY,
          },
        },
      })
    : null
}
