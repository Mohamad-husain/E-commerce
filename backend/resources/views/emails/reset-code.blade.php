<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Password Reset Code</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f8f9fa;
            padding: 40px;
            color: #212529;
        }

        .container {
            background-color: #ffffff;
            max-width: 600px;
            margin: 0 auto;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
            border-top: 4px solid #0d6efd;
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
        }

        .code {
            display: inline-block;
            background-color: #e9f5ff;
            color: #0d6efd;
            font-size: 28px;
            font-weight: bold;
            padding: 15px 25px;
            border-radius: 6px;
            letter-spacing: 4px;
            margin: 20px 0;
        }

        .footer {
            margin-top: 40px;
            font-size: 14px;
            color: #6c757d;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Password Reset Request</h2>
            <p>We received a request to reset your account password.</p>
        </div>

        <p style="text-align: center;">Use the code below to reset your password:</p>

        <div style="text-align: center;">
            <div class="code">{{ $code }}</div>
        </div>

        <p>If you didn’t request a password reset, please ignore this email.</p>

        <div class="footer">
            &copy; {{ date('Y') }} Ecommerce App. All rights reserved.
        </div>
    </div>
</body>
</html>
