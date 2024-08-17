import React, { useEffect, useRef } from 'react';

const Chart = ({ symbol = "AAPL", interval = "D", theme = "light", width = "100%", height = 500 }) => {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      if (chartContainerRef.current) {
        new window.TradingView.widget({
          symbol: symbol,
          interval: interval,
          container_id: chartContainerRef.current.id,
          width: width,
          height: height,
          theme: theme,
          style: "1",
          locale: "en",
          toolbar_bg: "#f1f3f6",
          enable_publishing: false,
          allow_symbol_change: true,
          hide_top_toolbar: true,
          hide_side_toolbar: false,
          withdateranges: true,
          save_image: false,
          studies: ["BB@tv-basicstudies"],
        });
      }
    };
    document.body.appendChild(script);

    // Cleanup the script when component unmounts
    return () => {
      if (chartContainerRef.current) {
        chartContainerRef.current.innerHTML = "";
      }
      document.body.removeChild(script);
    };
  }, [symbol, interval, theme, width, height]);

  return (
    <div
      id={`tradingview_${symbol}`}
      ref={chartContainerRef}
      style={{ width: "100%", height: height }}
    />
  );
};

export default Chart;
