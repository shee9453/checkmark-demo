import { useState, useEffect } from "react";
import { useLottie } from "lottie-react";
import "./App.css";

import logoSVG from "./assets/wayfairlogo.svg";
import loadingAnim from "./assets/loading.json";
import checkmarkAnim from "./assets/checkmark.json";

// Loader (모양 그대로, 흰색 필터)
function Loader() {
  const { View } = useLottie({
    animationData: loadingAnim,
    loop: true,
    autoplay: true,
    style: { width: 65, height: 65 },
  });
  return <div className="lottie-white">{View}</div>;
}

// Checkmark (모양 그대로, 흰색 필터)
function Checkmark() {
  const { View } = useLottie({
    animationData: checkmarkAnim,
    loop: false,
    autoplay: true,
    style: { width: 65, height: 65 },
  });
  return <div className="lottie-white">{View}</div>;
}

export default function App() {
  const [phase, setPhase] = useState("start");

  const handleCheckout = () => setPhase("light");

  useEffect(() => {
    let t;

    if (phase === "light") t = setTimeout(() => setPhase("dark"), 300);
    else if (phase === "dark") t = setTimeout(() => setPhase("scale"), 400);
    else if (phase === "scale") t = setTimeout(() => setPhase("loading"), 600);
    else if (phase === "loading") t = setTimeout(() => setPhase("checkmark"), 900);

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

        {/* 애니메이션 단계 로고 */}
        {phase !== "start" && (
          <img src={logoSVG} className={logoClass} alt="wayfair" />
        )}

        {/* 중앙 애니 */}
        <div className="center-anim">
          {phase === "loading" && <Loader />}
          {phase === "checkmark" && <Checkmark />}
        </div>

        {/* 시작 화면 */}
        {phase === "start" && (
          <div className="checkout-screen">
            <img src={logoSVG} className="logo-start purple absolute-start" />

            <h2>Your Order</h2>

            <div className="item">
              <div className="item-img" />
              <div className="item-info">
                <div className="title">Modern Standing Lamp</div>
                <div className="sub">Ships in 1–2 days</div>
              </div>
            </div>

            <div className="summary">
              <div className="row"><span>Subtotal</span><span>$120.00</span></div>
              <div className="row"><span>Shipping</span><span>$9.99</span></div>
              <div className="row total"><span>Total</span><span>$129.99</span></div>
            </div>

            <button className="checkout-btn" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
