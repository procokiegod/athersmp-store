import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import styles from './styles.module.css';
import { ranks, items, type Rank, type StoreItem } from './store-data';
import { RedeemPage } from './redeem-page';
const logo = '/assets/logo.png';
const bannerStats = '/assets/trcanje.png';
const bannerStore = '/assets/store.png';
const bannerJoin = '/assets/howtojoin.png';

const NAV = ['Store', 'Ranks', 'Keys', 'How to Join'];

/**
 * Opens a Payhip product link in a new tab.
 * @param url The Payhip buy URL for the product.
 */
function openPayhip(url: string) {
  window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * The AtherSMP store — Minecraft server store themed in the AtherSMP
 * red/dark palette, with Payhip-powered checkout.
 */
export function AtherStorePrototype() {
  return (
    <Routes>
      <Route path="/" element={<StoreHome />} />
      <Route path="/redeem" element={<RedeemPage />} />
    </Routes>
  );
}

function StoreHome() {
  const [activeNav, setActiveNav] = useState('Store');
  const [detail, setDetail] = useState<Rank | null>(null);

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <div className={styles.brand}>
          <img src={logo} alt="AtherSMP logo" className={styles.brandLogo} />
          <span>
            <span className={styles.brandName}>Ather</span>
            <span className={styles.brandAccent}>SMP</span>
          </span>
        </div>
        <nav className={styles.nav}>
          {NAV.map((item) => (
            <span
              key={item}
              className={`${styles.navLink} ${activeNav === item ? styles.navActive : ''}`}
              onClick={() => setActiveNav(item)}
            >
              {item}
            </span>
          ))}
        </nav>
        <div className={styles.topRight}>
          <a
            href="/redeem"
            className={styles.redeemNavBtn}
          >
            🎮 Redeem Purchase
          </a>
        </div>
      </header>

      <main className={styles.content}>
        {/* Hero banners */}
        <section className={styles.bannerGrid}>
          <a className={styles.bannerBig}>
            <img src={bannerStats} alt="Stats" className={styles.bannerImg} />
          </a>
          <div className={styles.bannerSmallCol}>
            <a className={styles.bannerSmall}>
              <img src={bannerStore} alt="Store" className={styles.bannerImg} />
            </a>
            <a className={styles.bannerSmall}>
              <img src={bannerJoin} alt="How to Join" className={styles.bannerImg} />
            </a>
          </div>
        </section>

        {/* Ranks */}
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Ranks</h2>
        </div>
        <section className={styles.rankGrid}>
          {ranks.map((rank) => (
            <div
              key={rank.id}
              className={styles.rankCard}
              style={{
                borderColor: rank.popular ? rank.color : undefined,
                boxShadow: rank.popular ? `0 0 30px ${rank.glow}` : undefined,
              }}
            >
              {rank.popular && <span className={styles.rankPopular}>Most Popular</span>}
              <h3 className={styles.rankName} style={{ color: rank.color }}>
                {rank.name}
              </h3>
              <div className={styles.rankPriceRow}>
                <span className={styles.rankPrice}>${rank.price}</span>
                {rank.originalPrice && (
                  <span className={styles.rankOrig}>${rank.originalPrice}</span>
                )}
              </div>
              <ul className={styles.perks}>
                {rank.perks.map((perk) => (
                  <li key={perk} className={styles.perk}>
                    <span className={styles.perkCheck} style={{ color: rank.color }}>✔</span>
                    {perk}
                  </li>
                ))}
              </ul>
              <div className={styles.rankActions}>
                <button className={styles.detailBtn} onClick={() => setDetail(rank)}>
                  View Perks
                </button>
                <button
                  className={styles.buyBtn}
                  style={{ background: `linear-gradient(135deg, ${rank.color}, ${rank.color}cc)` }}
                  onClick={() => openPayhip(rank.buyUrl)}
                >
                  Buy Now — ${rank.price}
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* Keys */}
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Crate Keys</h2>
        </div>
        <section className={styles.itemGrid}>
          {items.map((item: StoreItem) => (
            <div key={item.id} className={styles.itemCard}>
              {item.tag && <span className={styles.itemTag}>{item.tag}</span>}
              <div className={styles.itemEmoji}>{item.emoji}</div>
              <div className={styles.itemName}>{item.name}</div>
              <div className={styles.itemPriceRow}>
                <span className={styles.itemPrice}>${item.price}</span>
                {item.originalPrice && (
                  <span className={styles.itemOrig}>${item.originalPrice}</span>
                )}
              </div>
              <button
                className={styles.itemBtn}
                onClick={() => openPayhip(item.buyUrl)}
              >
                Buy Now
              </button>
            </div>
          ))}
        </section>

        {/* How to join */}
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>How to Join</h2>
        </div>
        <section className={styles.joinCardFull}>
          <img src={bannerJoin} alt="How to join AtherSMP" className={styles.joinImg} />
        </section>
      </main>

      <footer className={styles.footer}>
        <p>
          © 2026 AtherSMP — <a href="https://athersmp.xyz">athersmp.xyz</a> · Not affiliated with Mojang or Microsoft.
        </p>
      </footer>

      {detail && (
        <RankDetail
          rank={detail}
          onClose={() => setDetail(null)}
          onBuy={() => openPayhip(detail.buyUrl)}
        />
      )}
    </div>
  );
}

/** Minecraft-style tooltip popup describing a rank's perks and commands. */
function RankDetail({ rank, onClose, onBuy }: { rank: Rank; onClose: () => void; onBuy: () => void }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.tooltip}
        style={{ borderColor: rank.color, boxShadow: `0 0 40px ${rank.glow}` }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.tooltipClose} onClick={onClose}>✕</button>
        <h3 className={styles.tooltipTitle} style={{ color: rank.color }}>
          RANK {rank.name.toUpperCase()}
        </h3>
        <p className={styles.tooltipDesc} style={{ color: rank.color }}>
          {rank.description}
        </p>

        <h4 className={styles.tooltipHead} style={{ color: rank.color }}>Rank Perks:</h4>
        <ul className={styles.tooltipList}>
          {rank.perks.map((perk) => (
            <li key={perk} style={{ color: rank.color }}>
              {perk.startsWith('Prefix:') ? (
                <>
                  Prefix:{' '}
                  <span className={styles.prefixBadge} style={{ background: rank.color }}>
                    {perk.replace('Prefix:', '').trim()}
                  </span>
                </>
              ) : (
                perk
              )}
            </li>
          ))}
        </ul>

        <h4 className={styles.tooltipHead} style={{ color: rank.color }}>Rank Commands:</h4>
        <ul className={styles.tooltipList}>
          {rank.commands.map((cmd) => (
            <li key={cmd} style={{ color: rank.color }}>{cmd}</li>
          ))}
        </ul>

        <button
          className={styles.tooltipBuy}
          style={{ background: `linear-gradient(135deg, ${rank.color}, ${rank.color}cc)` }}
          onClick={onBuy}
        >
          Buy Now — ${rank.price}
        </button>
      </div>
    </div>
  );
}
