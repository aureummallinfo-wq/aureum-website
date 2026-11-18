'use client';

import { useEffect, useState } from 'react';

export function AnimationToggle() {
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('aureum-animations');
    if (stored === 'off') {
      setDisabled(true);
      document.documentElement.classList.add('animationsOff');
    }
  }, []);

  function toggle() {
    const next = !disabled;
    setDisabled(next);
    if (next) {
      document.documentElement.classList.add('animationsOff');
      localStorage.setItem('aureum-animations', 'off');
    } else {
      document.documentElement.classList.remove('animationsOff');
      localStorage.setItem('aureum-animations', 'on');
    }
  }

  return (
    <button
      type="button"
      className="animationToggle"
      onClick={toggle}
      aria-pressed={disabled}
      title={disabled ? 'Enable animations' : 'Reduce animations'}
      suppressHydrationWarning
    >
      <span aria-hidden="true">{disabled ? '▶' : '❚❚'}</span>
      <span className="animationToggleLabel">{disabled ? 'Enable' : 'Pause'} animations</span>
    </button>
  );
}
