## Vercel Environment Variables to Set
Copy these from your local configuration and set them in the Vercel dashboard:

| Key | Value / Source |
|---|---|
| `NEXTAUTH_SECRET` | Generate with `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Your Vercel production URL (e.g., `https://your-app.vercel.app`) |
| `GITHUB_CLIENT_ID` | From GitHub Developer Settings |
| `GITHUB_CLIENT_SECRET` | From GitHub Developer Settings |
| `ANTHROPIC_API_KEY` | From Anthropic Console |
| `DATABASE_URL` | PostgreSQL URL from **Neon.tech** |
| `EMAIL_SERVER_HOST` | `smtp.resend.com` |
| `EMAIL_SERVER_PORT` | `465` |
| `EMAIL_SERVER_USER` | `resend` |
| `EMAIL_SERVER_PASSWORD` | Your Resend API key |
| `EMAIL_FROM` | `noreply@yourdomain.com` |

---

### Manual Action Required:
1. **Neon.tech**:
   - Create a project and a database.
   - Set `DATABASE_URL` to the provided connection string.
2. **GitHub**:
   - Update the Callback URL to: `https://your-app.vercel.app/api/auth/callback/github`
3. **Vercel**:
   - Redeploy after setting the environment variables.
