import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";

interface HeightContextValue {
  height: number | null;
  ref: React.RefObject<HTMLDivElement | null>;
}

const HeightContext = createContext<HeightContextValue | undefined>(undefined);

export const useElementHeight = () => {
  const context = useContext(HeightContext);
  if (!context) {
    throw new Error("useElementHeight must be used within a HeightProvider");
  }
  return context;
};

interface HeightProviderProps {
  children: ReactNode;
  dynamic?: boolean;
}

export const HeightProvider = ({ children, dynamic = true }: HeightProviderProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const updateHeight = () => {
      if (ref.current) {
        setHeight(ref.current.offsetHeight);
      }
    };

    updateHeight();

    if (!dynamic) return;
    const observer = new ResizeObserver(updateHeight);
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [dynamic]);

  return (
    <HeightContext.Provider value={{ height, ref }}>
      <div ref={ref}>{children}</div>
    </HeightContext.Provider>
  );
};
