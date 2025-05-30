import { Injectable } from "@nestjs/common";
import sslChecker from "ssl-checker";

@Injectable()
export class SslCheckerService {
  async checkDomain(hostname: string): Promise<any> {
    const cleanedHostname: string = hostname
      .replace(/^https?:\/\//, "")
      .split("/")[0];

    try {
      const result = await sslChecker(cleanedHostname);
      return {
        success: true,
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}
