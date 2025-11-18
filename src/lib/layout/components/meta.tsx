const APP_NAME = 'vite-react-chakra-starter';

export const Meta = () => {
  return (
    <>
      <title>Thomas Goodwin</title>
      <meta name="description" content="Thomas Goodwin Portfolio" />

      <meta name="application-name" content={APP_NAME} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={APP_NAME} />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content="#FFFFFF" />

      <link rel="shortcut icon" href="/favicon.svg" />
    </>
  );
};
