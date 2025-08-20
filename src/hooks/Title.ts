import { useEffect } from "react";

export const usePageTitle = (pageName: string) => {
  useEffect(() => {
    document.title = pageName ? `${pageName} - KoDash` : 'KoDash';
  }, [pageName]);
}
