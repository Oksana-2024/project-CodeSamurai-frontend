import { useMediaQuery } from "react-responsive";

function useMedia() {
  const isMobile = useMediaQuery({ query: "(max-width: 767.98px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1279px)",
  });
  const isDesktop = useMediaQuery({ query: "(min-width: 1280px)" });
  const isBigScreen = useMediaQuery({ query: "(min-width: 768px)" });
  return { isMobile, isTablet, isDesktop, isBigScreen };
}

export default useMedia;
