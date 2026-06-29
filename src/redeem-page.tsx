import { useState } from 'react';
import styles from './redeem.module.css';

type RedeemState = 'idle' | 'loading' | 'success' | 'error';

type RedeemResult = {
  message: string;
  product: string;
  username: string;
};

/**
 * The /redeem page — players enter their Payhip order ID and Minecraft
 * username after purchase to automatically receive their rank or key in-game.
 */
export function RedeemPage() {
  const [orderId, setOrderId] = useState('');
  const [username, setUsername] = useState('');
  const [state, setState] = useState<RedeemState>('idle');
  const [result, setResult] = useState<RedeemResult | null>(null);
  const [error, setError] = useState('');

  const usernameValid = /^[A-Za-z0-9_]{3,16}$/.test(username.trim());
  const orderIdValid = orderId.trim().length > 3;
  const canSubmit = usernameValid && orderIdValid && state !== 'loading';

  const handleRedeem = async () => {
    setState('loading');
    setError('');
    try {
      const apiBase = (process.env.BACKEND_URL || '') + '/api';
      const res = await fetch(`${apiBase}/redeem`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ orderId: orderId.trim(), username: username.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Redeem failed');
      setResult(data);
      setState('success');
    } catch (err) {
      setError((err as Error).message);
      setState('error');
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.icon}>🎮</div>
        <h1 className={styles.title}>Redeem Your Purchase</h1>
        <p className={styles.subtitle}>
          Enter your <strong>Payhip Order ID</strong> (from your receipt email) and your
          <strong> Minecraft username</strong> to receive your rank or key in-game
          automatically.
        </p>

        {state === 'success' && result ? (
          <div className={styles.success}>
            <div className={styles.successIcon}>✅</div>
            <h2 className={styles.successTitle}>Rank Granted!</h2>
            <p className={styles.successText}>{result.message}</p>
            <p className={styles.successHint}>
              Log in to <strong>athersmp.xyz</strong> to use your new perks!
            </p>
            <button className={styles.resetBtn} onClick={() => { setState('idle'); setOrderId(''); setUsername(''); setResult(null); }}>
              Redeem Another
            </button>
          </div>
        ) : (
          <>
            <div className={styles.field}>
              <label className={styles.label}>Payhip Order ID</label>
              <input
                className={styles.input}
                placeholder="e.g. PAY-123456"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                disabled={state === 'loading'}
              />
              <p className={styles.hint}>
                Find this in your receipt email from Payhip after purchase.
              </p>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Minecraft Username</label>
              <input
                className={styles.input}
                placeholder="e.g. AtherLegend"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                maxLength={16}
                disabled={state === 'loading'}
              />
              {username && !usernameValid && (
                <p className={styles.inputError}>
                  Enter a valid username (3–16 letters, numbers or _).
                </p>
              )}
            </div>

            {error && (
              <div className={styles.errorBox}>
                <span>⚠️</span> {error}
              </div>
            )}

            <button
              className={styles.redeemBtn}
              onClick={handleRedeem}
              disabled={!canSubmit}
            >
              {state === 'loading' ? 'Granting rank…' : 'Redeem Now 🎮'}
            </button>

            <p className={styles.note}>
              Having trouble? Contact staff on Discord with your Order ID and username.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
