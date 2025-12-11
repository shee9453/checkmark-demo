import { useState, useEffect } from "react";
import { useLottie } from "lottie-react";
import "./App.css";

import logoSVG from "./assets/wayfairlogo.svg";
import loadingAnim from "./assets/loading.json";
import checkmarkAnim from "./assets/checkmark.json";

import productImg from "./assets/test.png";
import arrowIcon from "./assets/arrow.svg";

/* ----------------- Loader (항상 회전) ----------------- */
function Loader() {
  const { View } = useLottie({
    animationData: loadingAnim,
    loop: true,
    autoplay: true,
    style: { width: 80, height: 80 },
  });
  return <div className="lottie-white">{View}</div>;
}

/* ----------------- Checkmark ----------------- */
function Checkmark() {
  const { View } = useLottie({
    animationData: checkmarkAnim,
    loop: false,
    autoplay: true,
    style: { width: 50, height: 50 },
  });
  return <div className="lottie-white">{View}</div>;
}

/* ----------------- Main App ----------------- */
export default function App() {
  const [phase, setPhase] = useState("start");

  const handleCheckout = () => setPhase("light");

  useEffect(() => {
    let t;

    if (phase === "light") t = setTimeout(() => setPhase("dark"), 300);
    else if (phase === "dark") t = setTimeout(() => setPhase("scale"), 400);
    else if (phase === "scale") t = setTimeout(() => setPhase("loading"), 600);
    else if (phase === "loading") t = setTimeout(() => setPhase("checkmark"), 2500);

    return () => clearTimeout(t);
  }, [phase]);

  const showLightBg = phase !== "start";
  const showDarkBg = ["dark", "scale", "loading", "checkmark"].includes(phase);

  let logoClass = "wayfair-logo";
  if (["light", "dark"].includes(phase)) logoClass += " logo-top";
  if (["scale", "loading", "checkmark"].includes(phase))
    logoClass += " logo-center scaled";

  return (
    <div className="app-shell">
      <div className="frame">
        {/* 연보라 배경 */}
        <div className={`purple-light-bg${showLightBg ? " visible" : ""}`} />

        {/* 진보라 배경 */}
        <div className={`purple-dark-bg${showDarkBg ? " visible" : ""}`} />

        {/* 애니 단계 로고 */}
        {phase !== "start" && (
          <img src={logoSVG} className={logoClass} alt="wayfair" />
        )}

        {/* 중앙 애니
            - loading: Lottie 로더 회전
            - checkmark: 정지된 원(static-ring) + 체크마크 겹침 */}
        <div className="center-anim">
          <div className="center-anim-layer">
            {phase === "loading" && <Loader />}

            {phase === "checkmark" && (
              <>
                <div className="static-ring" />
                <Checkmark />
              </>
            )}
          </div>
        </div>

        {/* START 화면 = Cart UI */}
        {phase === "start" && (
          <div className="checkout-screen">
            {/* 로고 */}
            <div className="cart-header">
              <img src={logoSVG} className="cart-logo" alt="Wayfair" />
            </div>

            {/* 상품 영역 */}
            <div className="cart-item">
              <img
                src={productImg}
                alt="Rolling Folding Bed"
                className="cart-item-image"
              />

              <div className="cart-item-main">
                <div className="cart-item-top">
                  <div className="cart-item-title">Rolling Folding Bed</div>
                  <div className="cart-item-price">$90</div>
                </div>

                <div className="cart-item-bottom">
                  <div className="cart-qty">
                    <span>1</span>
                    <span className="caret caret-down" />
                  </div>

                  <img
                    src={productImg}
                    alt="Rolling Folding Bed small"
                    className="cart-thumb"
                  />

                  <div className="cart-option">
                    <span className="caret caret-down" />
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping / Delivery / Payment / Total */}
            <div className="cart-sections">
              <div className="cart-row cart-row-disabled">
                <div className="cart-row-text">
                  <div className="cart-row-label">Shipping</div>
                  <div className="cart-row-sub">Est-</div>
                </div>
                <img
                  src={arrowIcon}
                  alt=""
                  className="cart-row-arrow disabled"
                />
              </div>

              <div className="cart-row">
                <div className="cart-row-text">
                  <div className="cart-row-label">Delivery</div>
                  <div className="cart-row-sub">Add</div>
                </div>
                <img src={arrowIcon} alt="" className="cart-row-arrow" />
              </div>

              <div className="cart-row">
                <div className="cart-row-text">
                  <div className="cart-row-label">Payment</div>
                  <div className="cart-row-sub">Add</div>
                </div>
                <img src={arrowIcon} alt="" className="cart-row-arrow" />
              </div>

              <div className="cart-total-row">
                <div className="cart-total-label">Est Total</div>
                <div className="cart-total-value">
                  <span>$294</span>
                  <img src={arrowIcon} alt="" className="cart-row-arrow" />
                </div>
              </div>
            </div>

            {/* Checkout 버튼 */}
            <button className="checkout-btn" onClick={handleCheckout}>
              Checkout
            </button>

            {/* 하단 홈 바 */}
            <div className="home-indicator" />
          </div>
        )}
      </div>
    </div>
  );
}
