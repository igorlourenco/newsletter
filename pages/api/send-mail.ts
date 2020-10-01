import {NowRequest, NowResponse} from '@vercel/node'

export default async (request: NowRequest, response: NowResponse) => {

    let email = request.query.email.toString();

    email = email.replace(/ /g,"");

    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: email,
        from: 'theigorlourenco@gmail.com', // Use the email address or domain you verified above
        subject: '⚡ Você se inscreveu na newsletter Igor Lourenço',
        text: 'Obrigado por ter se inscrito. Enviarei conteúdo diariamente',
        html: '<h6>Obrigado por ter se inscrito. Enviarei conteúdo diariamente</h6><br><strong>essa newsletter é fictícia</strong>',
    };

    sgMail
        .send(msg)
        .then(() => {
        }, error => {
            console.error(error);
            if (error.response) {
                console.error(error.response.body)
            }
        });

    return response.status(200).json({ok: true});
}