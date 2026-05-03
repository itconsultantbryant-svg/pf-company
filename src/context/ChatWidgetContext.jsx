import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { isChatWidgetEnabled } from '../config/features.js';

const ChatWidgetContext = createContext(null);

const SCROLL_MS = 15000;
const STORAGE_KEYS = {
  userOpened: 'enersource_chat_user_opened',
  proactiveScroll: 'enersource_chat_proactive_scroll_done',
  proactiveProduct: 'enersource_chat_proactive_product_'
};

export function ChatWidgetProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [proactiveHint, setProactiveHint] = useState(null);
  const userOpenedRef = useRef(
    typeof sessionStorage !== 'undefined' && sessionStorage.getItem(STORAGE_KEYS.userOpened) === '1'
  );
  const location = useLocation();

  const markUserOpened = useCallback(() => {
    userOpenedRef.current = true;
    try {
      sessionStorage.setItem(STORAGE_KEYS.userOpened, '1');
    } catch {
      /* ignore */
    }
    setProactiveHint(null);
  }, []);

  const openChat = useCallback(() => {
    setOpen(true);
    markUserOpened();
  }, [markUserOpened]);

  const openChatWithHint = useCallback(
    (hint) => {
      setProactiveHint(hint);
      setOpen(true);
    },
    []
  );

  const tryProactiveScroll = useCallback(() => {
    if (userOpenedRef.current) return;
    try {
      if (sessionStorage.getItem(STORAGE_KEYS.proactiveScroll) === '1') return;
    } catch {
      /* ignore */
    }
    openChatWithHint({
      kind: 'scroll',
      title: 'Need help choosing solar or storage?',
      body:
        'I can explain Enersource products and packages, compare options, and prepare an indicative quotation PDF for you.'
    });
    try {
      sessionStorage.setItem(STORAGE_KEYS.proactiveScroll, '1');
    } catch {
      /* ignore */
    }
  }, [openChatWithHint]);

  useEffect(() => {
    const done =
      typeof sessionStorage !== 'undefined' &&
      sessionStorage.getItem(STORAGE_KEYS.proactiveScroll) === '1';
    if (done || userOpenedRef.current) return;

    let scrolled = window.scrollY > 120;
    const onScroll = () => {
      if (window.scrollY > 120) scrolled = true;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const startedAt = Date.now();
    const iv = window.setInterval(() => {
      if (userOpenedRef.current) return;
      const elapsed = Date.now() - startedAt;
      if (elapsed >= SCROLL_MS && scrolled) {
        tryProactiveScroll();
        window.clearInterval(iv);
      }
    }, 400);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.clearInterval(iv);
    };
  }, [location.pathname, tryProactiveScroll]);

  const notifyProductView = useCallback(
    (productId, productName) => {
      const key = STORAGE_KEYS.proactiveProduct + productId;
      try {
        if (sessionStorage.getItem(key) === '1') return;
        sessionStorage.setItem(key, '1');
      } catch {
        /* ignore */
      }
      openChatWithHint({
        kind: 'product',
        title: `Looking at ${productName}?`,
        body:
          'I can walk through specs, typical pairings with inverters/PV, and add this item to an indicative quotation PDF.'
      });
    },
    [openChatWithHint]
  );

  const notifyServicesSection = useCallback(() => {
    try {
      if (sessionStorage.getItem('enersource_chat_services_hint') === '1') return;
      sessionStorage.setItem('enersource_chat_services_hint', '1');
    } catch {
      /* ignore */
    }
    openChatWithHint({
      kind: 'services',
      title: 'Explore Enersource services',
      body:
        'Ask how design, installation, maintenance, or training fit your project — I can summarize services or add them to a quote PDF.'
    });
  }, [openChatWithHint]);

  const notifyPackagesSection = useCallback(() => {
    try {
      if (sessionStorage.getItem('enersource_chat_packages_hint') === '1') return;
      sessionStorage.setItem('enersource_chat_packages_hint', '1');
    } catch {
      /* ignore */
    }
    openChatWithHint({
      kind: 'packages',
      title: 'Compare solar packages',
      body:
        'I can explain residential, commercial, and storage packages and build an indicative PDF with the lines you pick.'
    });
  }, [openChatWithHint]);

  const value = useMemo(
    () => ({
      isChatWidgetEnabled,
      open,
      setOpen,
      proactiveHint,
      setProactiveHint,
      openChat,
      openChatWithHint,
      markUserOpened,
      notifyProductView,
      notifyServicesSection,
      notifyPackagesSection
    }),
    [
      open,
      proactiveHint,
      openChat,
      openChatWithHint,
      markUserOpened,
      notifyProductView,
      notifyServicesSection,
      notifyPackagesSection
    ]
  );

  return <ChatWidgetContext.Provider value={value}>{children}</ChatWidgetContext.Provider>;
}

export function useChatWidget() {
  const ctx = useContext(ChatWidgetContext);
  if (!ctx) throw new Error('useChatWidget must be used within ChatWidgetProvider');
  return ctx;
}
