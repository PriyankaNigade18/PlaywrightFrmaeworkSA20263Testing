import nodemailer from 'nodemailer';

async function sendEmail() {

    console.log('1️⃣ Starting email process...');

    const username = process.env.MAIL_USERNAME;
    const password = process.env.MAIL_APP_PASSWORD;
    const reportUrl = process.env.ALLURE_REPORT_URL;
    const recipient = process.env.STUDENT_EMAILS;

    console.log('2️⃣ Username available:', !!username);
    console.log('3️⃣ Password available:', !!password);
    console.log('4️⃣ Allure URL available:', !!reportUrl);

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

    console.log('5️⃣ SMTP transporter created.');

    await transporter.verify();

    console.log('6️⃣ Gmail SMTP connection successful.');

    console.log('7️⃣ Sending email...');

    const info = await transporter.sendMail({

        from: username,

        to: recipient,

        subject: 'Playwright Automation - Allure Report',

        text: `
Hello,

Playwright automation execution has completed.

Environment: QA
Framework: Playwright
Browser: Chromium

View the Allure Report:

${reportUrl}

Regards,
Automation Team
`,

 html: `
    <h2>🎭 Playwright Automation Report</h2>

    <p>Playwright UI automation execution has completed.</p>

    <p>
        <strong>Environment:</strong> QA<br>
        <strong>Browser:</strong> Chromium
    </p>

    <p>
        <a href="${reportUrl}"
           style="
             display:inline-block;
             padding:12px 20px;
             background:#1976d2;
             color:white;
             text-decoration:none;
             border-radius:5px;">
             
             📊 View Playwright Report Dashboard
             
        </a>
    </p>
`
    });

    console.log('8️⃣ Email sent successfully.');
    console.log('Message ID:', info.messageId);
}

sendEmail().catch(error => {

    console.error(
        '❌ Failed to send email:',
        error
    );

    process.exit(1);
});
