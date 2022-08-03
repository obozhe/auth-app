import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import SMTPTransport, { MailOptions } from 'nodemailer/lib/smtp-transport';

import { MailerErrorCodes } from '../error/consts/error-codes';
import BaseError from '../error/models/base-error';

dotenv.config();

class MailerController {
    private transporter: nodemailer.Transporter = nodemailer.createTransport({
        port: Number(process.env.MAILER_PORT),
        host: process.env.MAILER_HOST,
        auth: {
            user: process.env.MAILER_USER,
            pass: process.env.MAILER_PASSWORD,
        },
        secure: process.env.MAILER_PORT === '465',
    });

    public async send({ from = process.env.MAILER_FROM, to, subject, text, html }: MailOptions) {
        const info: SMTPTransport.SentMessageInfo = await this.transporter.sendMail({
            from,
            to,
            subject,
            text,
            html,
        });

        if (!info.messageId) {
            throw new BaseError(MailerErrorCodes.MAIL_NOT_SENT);
        }
    }
}

export default new MailerController();
