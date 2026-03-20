import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';
import express from 'express';
import nodemailer from 'nodemailer';

const envFiles = ['.env.local', '.env'];

for (const file of envFiles) {
  const envPath = path.resolve(process.cwd(), file);
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath, override: true });
  }
}

const app = express();
const port = Number(process.env.PORT || 8787);

app.use(express.json());

type ApplicationPayload = {
  name?: string;
  email?: string;
  university?: string;
  city?: string;
  skills?: string;
  interests?: string;
  portfolio?: string;
  motivation?: string;
  personalityType?: string;
  personalityAnswers?: Record<string, string>;
  personalityDetails?: Record<string, string>;
};

const requiredFields: Array<keyof ApplicationPayload> = [
  'name',
  'email',
  'university',
  'city',
  'skills',
  'interests',
  'portfolio',
  'motivation',
];

function validatePayload(payload: ApplicationPayload) {
  const missing = requiredFields.filter((field) => !payload[field]?.trim());
  return missing;
}

app.post('/api/apply', async (req, res) => {
  const payload = req.body as ApplicationPayload;
  const missing = validatePayload(payload);

  if (missing.length > 0) {
    return res.status(400).json({ error: `Missing required fields: ${missing.join(', ')}` });
  }

  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const toEmail = process.env.APPLICATION_TO || 'shaunakkate87@gmail.com';

  if (!smtpUser || !smtpPass) {
    return res.status(500).json({ error: 'Mail server is not configured. Add SMTP_USER and SMTP_PASS.' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const personalityType = payload.personalityType || 'Not provided';
  const personalityDetails = payload.personalityDetails || {};

  // Build plain-text personality breakdown
  const personalityLines: string[] = [];
  for (const [question, answer] of Object.entries(personalityDetails)) {
    personalityLines.push(`Q: ${question}`);
    personalityLines.push(`→ ${answer}`);
    personalityLines.push('');
  }

  const lines = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `University: ${payload.university}`,
    `City: ${payload.city}`,
    `Skills: ${payload.skills}`,
    `Interests: ${payload.interests}`,
    `Portfolio: ${payload.portfolio}`,
    '',
    'Motivation:',
    payload.motivation || '',
    '',
    `Builder Personality Type: ${personalityType}`,
    '',
    'Personality Answers:',
    ...personalityLines,
  ];

  // Build HTML personality breakdown
  const personalityHtml = Object.entries(personalityDetails)
    .map(
      ([question, answer]) =>
        `<div style="margin-bottom: 16px; padding: 12px 16px; background: #f9fafb; border-left: 3px solid #6366f1; border-radius: 4px;">
          <p style="margin: 0 0 6px 0; font-weight: 600; color: #374151; font-size: 14px;">${question}</p>
          <p style="margin: 0; color: #6b7280; font-size: 14px;">→ ${answer}</p>
        </div>`
    )
    .join('\n');

  try {
    await transporter.sendMail({
      from: smtpUser,
      to: toEmail,
      replyTo: payload.email,
      subject: `[${personalityType}] New Builders Club application from ${payload.name}`,
      text: lines.join('\n'),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827; max-width: 640px;">
          <h2 style="margin-bottom: 4px;">New Builders Club application</h2>
          <p style="margin-top: 0; color: #6b7280; font-size: 14px;">Personality type: <strong style="color: #6366f1; font-size: 16px;">${personalityType}</strong></p>

          <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;" />

          <p><strong>Name:</strong> ${payload.name}</p>
          <p><strong>Email:</strong> ${payload.email}</p>
          <p><strong>University:</strong> ${payload.university}</p>
          <p><strong>City:</strong> ${payload.city}</p>
          <p><strong>Skills:</strong> ${payload.skills}</p>
          <p><strong>Interests:</strong> ${payload.interests}</p>
          <p><strong>Portfolio:</strong> <a href="${payload.portfolio}">${payload.portfolio}</a></p>

          <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;" />

          <p><strong>Why they want to join:</strong></p>
          <p style="padding: 12px 16px; background: #f9fafb; border-radius: 6px;">${payload.motivation?.replace(/\n/g, '<br />')}</p>

          <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;" />

          <h3 style="margin-bottom: 16px;">Personality Breakdown — ${personalityType}</h3>
          ${personalityHtml}
        </div>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Failed to send application email', error);
    return res.status(500).json({ error: 'Failed to send application email.' });
  }
});

app.listen(port, () => {
  console.log(`Application server listening on http://localhost:${port}`);
});
