import { useEffect, useState } from "react";
import "./App.css";

function CheckoutAnimation({ onDone }) {
  const [step, setStep] = useState(0); 
  // 0: 페이드 단계, 1: 배경+로고, 2: 로더, 3: 체크마크

  useEffect(() => {
    let timer;
    if (step === 0) {
      timer = setTimeout(() => setStep(1), 600);
    } else if (step === 1) {
      timer = setTimeout(() => setStep(2), 800);
    } else if (step === 2) {
      timer = setTimeout(() => setStep(3), 1500);
    } else if (step === 3) {
      timer = setTimeout(() => {
        onDone?.();
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [step, onDone]);

  return (
    <div className={`anim-overlay step-${step}`}>
      <div className="anim-stage">
        <div className={`anim-logo ${step >= 1 ? "visible" : ""}`}>
          BEST&nbsp;BUY
        </div>

        {step === 2 && (
          <div className="loader-circle" aria-label="loading" />
        )}

        {step === 3 && (
          <div className="checkmark-wrap">
            <svg
              className="checkmark-svg"
              viewBox="0 0 64 64"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="cm-circle"
                cx="32"
                cy="32"
                r="24"
                fill="none"
                strokeWidth="4"
              />
              <path
                className="cm-check"
                fill="none"
                strokeWidth="4"
                d="M20 33 L28 41 L44 25"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [showAnim, setShowAnim] = useState(false);

  return (
    <div className="app-root">
      <main className={`page-content ${showAnim ? "fade-out" : ""}`}>
        <div className="fake-phone">
          <header className="phone-header">
            <span className="logo-small">BEST BUY</span>
          </header>
          <section className="phone-body">
            <h1>Checkout</h1>
            <p>Sample order summary goes here.</p>
            <button
              className="primary-btn"
              onClick={() => setShowAnim(true)}
              disabled={showAnim}
            >
              Complete purchase
            </button>
          </section>
        </div>
      </main>

      {showAnim && (
        <CheckoutAnimation
          onDone={() => {
            // 애니메이션 끝난 후 다시 초기화하거나,
            // 실제 프로젝트에서는 완료 화면으로 라우팅하면 됨
            setShowAnim(false);
          }}
        />
      )}
    </div>
  );
}
