import {
  ShoppingOutlined,
  ThunderboltOutlined,
  SafetyCertificateOutlined,
  CustomerServiceOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="landing-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Daraz</h1>
          <p>
            Discover top-quality electronics, fashion, accessories and more at
            unbelievable prices.
          </p>
          <Link to="/products" className="cta-button">
            Shop Now <ArrowRightOutlined />
          </Link>
        </div>
      </div>

      <div className="features-section">
        <h2 className="section-title">Why Shop With Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <ThunderboltOutlined />
            </div>
            <h3>Fast Delivery</h3>
            <p>
              Get your items delivered right to your doorstep quickly and
              securely.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <SafetyCertificateOutlined />
            </div>
            <h3>Quality Guaranteed</h3>
            <p>
              100% authentic products sourced directly from trusted brands.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <CustomerServiceOutlined />
            </div>
            <h3>24/7 Support</h3>
            <p>
              Our support team is always here to assist you with your orders.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <ShoppingOutlined />
            </div>
            <h3>Wide Selection</h3>
            <p>Explore thousands of products across diverse categories.</p>
          </div>
        </div>
      </div>

      <div className="landing-cta-banner">
        <h2>Ready to Explore Our Catalog?</h2>
        <p>Check out our latest arrivals and exclusive deals today.</p>
        <Link to="/products" className="secondary-cta-button">
          Browse Products
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
