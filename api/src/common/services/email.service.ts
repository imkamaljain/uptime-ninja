import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import { baseTemplate } from "../templates/base-template";
import { MyLoggerService } from "./my-logger.service";

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly logger: MyLoggerService) {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number.parseInt(process.env.SMTP_PORT || "587", 10),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendDownNotification(
    email: string,
    monitorName: string,
    url: string,
    error?: string,
  ) {
    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: email,
        subject: `🔴 Monitor Alert: ${monitorName} is down`,
        html: baseTemplate({
          title: `🔴 Monitor Alert: ${monitorName} is down`,
          body: `
    <p>Your monitor <strong>${monitorName}</strong> is currently <span style="color: red;"><strong>DOWN</strong></span>.</p>
    <p><strong>URL:</strong> <a href="${url}">${url}</a></p>
    ${error ? `<p><strong>Error:</strong> ${error}</p>` : ""}
    <p>We'll notify you when the service is back up.</p>
  `,
        }),
      });
      this.logger.log(
        `Down notification sent to ${email} for monitor ${monitorName}`,
      );
    } catch (error) {
      this.logger.error(`Failed to send down notification: ${error.message}`);
    }
  }

  async sendUpNotification(
    email: string,
    monitorName: string,
    url: string,
    downtime: string,
  ) {
    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: email,
        subject: `✅ Monitor Recovery: ${monitorName} is back up`,
        html: baseTemplate({
          title: `✅ Monitor Recovery: ${monitorName} is back up`,
          body: `
    <p>Your monitor <strong>${monitorName}</strong> is now <span style="color: green;"><strong>UP</strong></span>.</p>
    <p><strong>URL:</strong> <a href="${url}">${url}</a></p>
    <p><strong>Total downtime:</strong> ${downtime}</p>
  `,
        }),
      });
      this.logger.log(
        `Up notification sent to ${email} for monitor ${monitorName}`,
      );
    } catch (error) {
      this.logger.error(`Failed to send up notification: ${error.message}`);
    }
  }

  async sendSSLExpiryNotification(
    email: string,
    monitorName: string,
    url: string,
    daysToExpiry: number,
  ) {
    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: email,
        subject: `⚠️ SSL Certificate Expiry Alert: ${monitorName}`,
        html: baseTemplate({
          title: `⚠️ SSL Certificate Expiry Alert: ${monitorName}`,
          body: `
    <p>The SSL certificate for your monitor <strong>${monitorName}</strong> is about to expire.</p>
    <p><strong>URL:</strong> <a href="${url}">${url}</a></p>
    <p><strong>Time until expiry:</strong> ${daysToExpiry} day${daysToExpiry !== 1 ? "s" : ""}</p>
    <p>Please renew the certificate to avoid disruption.</p>
  `,
        }),
      });
      this.logger.log(
        `SSL expiry notification sent to ${email} for monitor ${monitorName}`,
      );
    } catch (error) {
      this.logger.error(
        `Failed to send SSL expiry notification: ${error.message}`,
      );
    }
  }
}
