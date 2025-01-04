// pages/_app.js
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap globally
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
