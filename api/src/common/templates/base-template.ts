export function baseTemplate({
  title,
  body,
  footer = "You are receiving this alert from Uptime Ninja.",
}: {
  title: string;
  body: string;
  footer?: string;
}): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
      <h2 style="color: #333;">${title}</h2>
      <div style="font-size: 16px; line-height: 1.5; color: #555;">
        ${body}
      </div>
      <hr style="margin: 20px 0;" />
      <div style="font-size: 12px; color: #999;">${footer}</div>
    </div>
  `;
}
