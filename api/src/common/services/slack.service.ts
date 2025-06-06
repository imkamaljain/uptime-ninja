import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SlackService {
  constructor(private readonly httpService: HttpService) {}

  async sendAlert(webhookUrl: string, text: string): Promise<void> {
    try {
      await this.httpService.axiosRef.post(webhookUrl, {
        text,
      });
    } catch (error) {
      console.error("Error sending Slack message:", error.message);
    }
  }
}
