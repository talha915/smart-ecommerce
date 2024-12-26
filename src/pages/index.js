import styles from '../styles/index.module.css'; // Import the CSS Module
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Home() {

  const router = useRouter();

  const handleNavigation = () => {
    router.push('/products');
  };

  return (
    <div className={styles.marginAll8}>
      {/* Hero Section */}
      <section className={styles.heroContainer}>
        <div className={styles.heroImage}>
          <Image
            src="/hero-home1.webp"
            alt="Hero Image"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
        <div className={styles.heroOverlay}>
          <div className={styles.heroText}>
            <h2>Welcome to ShopEasy</h2>
            <p>Your one-stop shop for all your needs!</p>
            <a onClick={handleNavigation} className={styles.heroButton}>
              Start Shopping
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
