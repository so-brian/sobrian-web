import {
  createDOMRenderer,
  FluentProvider,
  GriffelRenderer,
  SSRProvider,
  RendererProvider,
  webLightTheme,
} from '@fluentui/react-components';
import type { AppProps } from 'next/app';
import { SoFooter, SoHeader } from '../components';

type EnhancedAppProps = AppProps & { renderer?: GriffelRenderer };

function MyApp({ Component, pageProps, renderer }: EnhancedAppProps) {
  return (
    // 👇 Accepts a renderer from <Document /> or creates a default one
    //    Also triggers rehydration a client
    <RendererProvider renderer={renderer || createDOMRenderer()}>
      <SSRProvider>
        <FluentProvider theme={webLightTheme}>
          <div style={{
            display: 'flex',
            minHeight: '100vh',
            flexDirection: 'column',
          }}>
            <SoHeader />
            <div style={{
              backgroundColor: 'green',
              flex: '1',
            }}>
              <Component {...pageProps} />
            </div>
            <SoFooter />
          </div>
        </FluentProvider>
      </SSRProvider>
    </RendererProvider>
  );
}

export default MyApp;