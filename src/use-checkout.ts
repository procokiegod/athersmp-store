import { useState, useCallback } from 'react';
import type { CartLine } from './store-data.js';

const API_BASE = '/api';

/** Shape of a confirmed order returned by the backend. */
export type Order = {
  username: string;
  amountTotal: number;
  currency: string;
  status: string;
  items: { name: string; quantity: number }[];
  fulfilled: boolean;
};

/**
 * Hook that talks to the store backend to start a Stripe Checkout session and
 * to confirm a completed order on the success page.
 */
export function useCheckout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Create a Stripe Checkout session for the cart and redirect the browser
   * to the hosted payment page.
   *
   * @param lines The cart line items.
   * @param username The buyer's Minecraft username.
   */
  const startCheckout = useCallback(async (lines: CartLine[], username: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          username,
          items: lines.map((l) => ({ id: l.id, qty: l.qty })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Checkout failed');
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
    }
  }, []);

  /**
   * Fetch a completed order summary for the success page.
   *
   * @param sessionId The Stripe Checkout session id from the redirect.
   */
  const fetchOrder = useCallback(async (sessionId: string): Promise<Order | null> => {
    try {
      const res = await fetch(`${API_BASE}/order/${sessionId}`, {
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not load order');
      return data as Order;
    } catch (err) {
      setError((err as Error).message);
      return null;
    }
  }, []);

  return { loading, error, startCheckout, fetchOrder };
}
