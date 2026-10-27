import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

export default function ChatWidget() {
  useEffect(() => {
    // 1. n8n Chat Initialization
    const chat = createChat({
      webhookUrl:
        'https://filmpro.app.n8n.cloud/webhook/4e13eb37-c0a7-40d3-b67c-eb282bdf2503/chat',
      mode: 'window',
      showWelcomeScreen: false,
      initialMessages: [
        'გამარჯობა! 👋',
        'აღწერე ფილმი და ასისტენტი გიპოვის მას',
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

    // 2. Dynamic Style Injection for Shadow DOM / Custom Elements
    const injectStyles = () => {
      const styleId = 'n8n-chat-custom-style-override';
      if (document.getElementById(styleId)) return;

      const style = document.createElement('style');
      style.id = styleId;
      style.innerHTML = `
        /* n8n Chat Widget Global & Element Overrides */
        n8n-chat, div[class*="n8n-chat"], .n8n-chat-widget {
          --chat--color-primary: #e50914 !important;
          --chat--color-primary-shade-50: #b80710 !important;
          --chat--color-primary-shade-100: #8d040a !important;
          --chat--color-background: #0b0f19 !important;
          --chat--color-font: #f8fafc !important;
          --chat--header--background: #151c2c !important;
          --chat--header--color: #ffffff !important;
          --chat--message--bot--background: #1e293b !important;
          --chat--message--bot--color: #ffffff !important;
          --chat--message--user--background: #e50914 !important;
          --chat--message--user--color: #ffffff !important;
          --chat--toggle--background: #e50914 !important;
        }

        /* Direct targeting of buttons and chat elements */
        [class*="chat-input-send-button"], 
        [class*="chat-toggle-button"],
        button[type="submit"] {
          background-color: #e50914 !important;
          color: #ffffff !important;
        }

        [class*="chat-header"] {
          background-color: #151c2c !important;
          color: #ffffff !important;
        }

        [class*="chat-body"], [class*="chat-window"] {
          background-color: #0b0f19 !important;
        }
      `;
      document.head.appendChild(style);

      // Shadow DOM Handling (თუ ჩატი Shadow Root-შია)
      document.querySelectorAll('*').forEach((el) => {
        if (el.shadowRoot && !el.shadowRoot.getElementById(styleId)) {
          el.shadowRoot.appendChild(style.cloneNode(true));
        }
      });
    };

    // მცირე დაყოვნება, რომ n8n ჩატის ელემენტებმა მოსწროს ჩატვირთვა DOM-ში
    const timer = setTimeout(injectStyles, 300);

    return () => {
      clearTimeout(timer);
      chat?.unmount();
      document.getElementById('n8n-chat-custom-style-override')?.remove();
    };
  }, []);

  return null;
}