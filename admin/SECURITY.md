# LawLink Super Admin Console — Security Standards

## Security Directives
1. **Authentication & Session Tokens:**
   - Admin access tokens are short-lived.
   - Unauthorized attempts to access `/admin` return `403 Forbidden` or redirect to `/admin/login`.
2. **Data Subject & Confidentiality Protection:**
   - Client-lawyer privileged communications and unmasked PII are strictly restricted by backend permission checks.
   - High-risk operations (e.g., lawyer suspensions, escrow payouts, matching weight changes) require confirmation dialogs and generate audit logs.
3. **Audit Trail Logging:**
   - Every administrative mutation logs the Admin ID, action type, target resource, old value, new value, IP address, and timestamp.
