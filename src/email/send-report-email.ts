
import nodemailer from 'nodemailer';

async function sendEmail() {
    console.log('Starting Playwright email process...');

    const username = process.env.MAIL_USERNAME;
    const password = process.env.MAIL_APP_PASSWORD;
    const reportUrl = process.env.ALLURE_REPORT_URL;
    const recipient = process.env.STUDENT_EMAILS;

    const environment =
        process.env.TEST_ENVIRONMENT || 'QA';

    const buildStatus =
        process.env.BUILD_STATUS || 'UNKNOWN';

    const buildNumber =
        process.env.BUILD_NUMBER || 'N/A';

    const buildUrl =
        process.env.BUILD_URL || '';

    console.log('Email username available:', !!username);
    console.log('Email password available:', !!password);
    console.log('Report URL available:', !!reportUrl);
    console.log('Recipients available:', !!recipient);

    if (!username || !password) {
        throw new Error(
            'MAIL_USERNAME or MAIL_APP_PASSWORD is missing.'
        );
    }

    if (!reportUrl) {
        throw new Error(
            'ALLURE_REPORT_URL is missing.'
        );
    }

    if (!recipient) {
        throw new Error(
            'STUDENT_EMAILS is missing.'
        );
    }

    const recipients = recipient
        .split(',')
        .map(email => email.trim())
        .filter(Boolean);

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: username,
            pass: password
        },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 30000
    });

    console.log('Checking Gmail SMTP connection...');

    await transporter.verify();

    console.log('Gmail SMTP connection successful.');

    const statusColor =
        buildStatus.toUpperCase() === 'SUCCESS'
            ? '#198754'
            : '#dc3545';

    const info = await transporter.sendMail({
        from: username,
        to: recipients,

        subject:
            `Playwright ${buildStatus} - ${environment} - Build #${buildNumber}`,

        text: `
Hello,

Playwright UI automation execution has completed.

Environment: ${environment}
Framework: Playwright
Browser: Chromium
Build Number: ${buildNumber}
Build Status: ${buildStatus}

Jenkins Build:
${buildUrl || 'Not available'}

Allure Report:
${reportUrl}

Regards,
Automation Team
`,

        html: `
            <div style="font-family:Arial,sans-serif;line-height:1.6">
                <h2>Playwright Automation Report</h2>

                <p>
                    Playwright UI automation execution has completed.
                </p>

                <table style="border-collapse:collapse">
                    <tr>
                        <td style="padding:6px"><strong>Environment</strong></td>
                        <td style="padding:6px">${escapeHtml(environment)}</td>
                    </tr>
                    <tr>
                        <td style="padding:6px"><strong>Browser</strong></td>
                        <td style="padding:6px">Chromium</td>
                    </tr>
                    <tr>
                        <td style="padding:6px"><strong>Build Number</strong></td>
                        <td style="padding:6px">${escapeHtml(buildNumber)}</td>
                    </tr>
                    <tr>
                        <td style="padding:6px"><strong>Build Status</strong></td>
                        <td style="padding:6px;color:${statusColor}">
                            <strong>${escapeHtml(buildStatus)}</strong>
                        </td>
                    </tr>
                </table>

                ${
                    buildUrl
                        ? `<p>
                            <a href="${escapeHtml(buildUrl)}">
                                Open Jenkins Build
                            </a>
                           </p>`
                        : ''
                }

                <p style="margin-top:24px">
                    <a href="${escapeHtml(reportUrl)}"
                       style="display:inline-block;padding:12px 20px;
                       background:#1976d2;color:white;
                       text-decoration:none;border-radius:5px">
                        View Allure Report
                    </a>
                </p>

                <p>Regards,<br>Automation Team</p>
            </div>
        `
    });

    console.log('Email sent successfully.');
    console.log('Message ID:', info.messageId);
}

function escapeHtml(value: string): string {
    return value.replace(/[&<>"']/g, character => {
        const entities: Record<string, string> = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };

        return entities[character];
    });
}

sendEmail().catch(error => {
    console.error('Failed to send email:', error);
    process.exit(1);
});
