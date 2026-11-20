import Link from 'next/link';
import { PAYMENT_PLAN_PAGES } from '../plan-pages';

/** Compact homepage navigation into the full payment-plan routes. */
export function PaymentPlanRouter() {
  return (
    <section className="paymentRouterSection" aria-labelledby="payment-router-heading">
      <div className="container paymentRouter">
        <div>
          <p className="paymentRouterEyebrow">Payment plans</p>
          <h2 id="payment-router-heading">Choose your property type.</h2>
          <p>Open the dedicated page for sizes, prices and the complete instalment schedule.</p>
        </div>
        <details className="paymentRouterDropdown">
          <summary>View payment plans</summary>
          <div className="paymentRouterMenu">
            <Link href="/payment-plans">All payment plans<span aria-hidden="true">&rarr;</span></Link>
            {PAYMENT_PLAN_PAGES.map((page) => (
              <Link key={page.table.id} href={page.href}>
                <span>
                  <small>{page.group}</small>
                  {page.label}
                </span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            ))}
          </div>
        </details>
      </div>
    </section>
  );
}
