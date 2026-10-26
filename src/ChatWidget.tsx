import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

export default function ChatWidget() {
  useEffect(() => {
    const chat = createChat({
      webhookUrl:
        'https://filmpro.app.n8n.cloud/webhook/4e13eb37-c0a7-40d3-b67c-eb282bdf2503/chat',
      mode: 'window',
      showWelcomeScreen: false,
      initialMessages: [
        'გამარჯობა! 👋',
        'მე ვარ ფილმების ასისტენტი. რა ფილმს ეძებ დღეს?',
      ],
     i18n: {
       en: {
    title: 'ფილმების ასისტენტი',
    subtitle: 'მკითხე ნებისმიერი ფილმის შესახებ',
    footer: '',
    getStarted: 'ახალი საუბარი',
    inputPlaceholder: 'დაწერე შეტყობინება...',
    closeButtonTooltip: 'დახურვა',
  },
},
    });

    return () => {
      chat?.unmount();
    };
  }, []);

  return null;
}