# LawLink Super Admin Console — System Architecture

## Architecture Principles
1. **Separation of Concerns:** The admin console communicates strictly via REST APIs with the NestJS/Express backend. Business logic and authorization enforcement reside on the backend.
2. **Feature-Based Modular Structure:**
   - `src/features/auth`: Admin Login, JWT Token Refresh & Session Manager.
   - `src/features/dashboard`: High-level metrics, GMV analytics, quick actions.
   - `src/features/users`: Client and Lawyer RBAC User Management.
   - `src/features/verification`: Lawyer & Law Firm Document Verification Desk.
   - `src/features/cases`: Legal Case File tracker and milestone monitor.
   - `src/features/payments`: Escrow transactions, withdrawals, and fee settlements.
   - `src/features/reviews`: Client review moderation and report handling.
   - `src/features/disputes`: Dispute resolution workflow.
   - `src/features/ai`: AI intake configuration and matching engine weights.
   - `src/features/audit`: Immutable system audit trail.
3. **Role-Based Access Control (RBAC):**
   - `SUPER_ADMIN`: Unrestricted platform access.
   - `VERIFICATION_ADMIN`: Lawyer and Firm credential review.
   - `FINANCE_ADMIN`: Escrow releases, payments, and payouts.
   - `SUPPORT_ADMIN`: Tickets, client disputes, and case monitoring.
   - `MODERATOR`: Content and review moderation.
   - `ANALYST`: Read-only reporting.
