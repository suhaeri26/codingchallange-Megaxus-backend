import nodemailer from "nodemailer";
import { env } from "../../config/env";

class MailerService {
  private readonly transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_SECURE,
    auth: {
      user: env.SMTP_USERNAME,
      pass: env.SMTP_PASSWORD,
    },
  });

  async sendEmailVerification(
    email: string,
    token: string,
  ): Promise<void> {
    const verificationUrl = `${env.APP_URL}/verify-email?token=${token}`;

    await this.transporter.sendMail({
      from: env.SMTP_FROM,
      to: email,
      subject: "Verify Your Email",
      html: `
        <h2>Welcome to Gacha System 👋</h2>

        <p>
          Thank you for registering.
        </p>

        <p>
          Please click the button below to verify your email.
        </p>

        <p>
          <a
            href="${verificationUrl}"
            style="
              display:inline-block;
              padding:12px 20px;
              background:#2563eb;
              color:#fff;
              text-decoration:none;
              border-radius:6px;
            "
          >
            Verify Email
          </a>
        </p>

        <p>
          Or open this link:
        </p>

        <p>
          ${verificationUrl}
        </p>

        <p>
          This link will expire in 15 minutes.
        </p>
      `,
    });
  }
}

export const mailerService = new MailerService();