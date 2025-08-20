interface Pagina {
  icon: string;
  path: string;
  label: string;
  rules?: string[];
};

export const Permission = (pages: Pagina[], path: string, rules: string) => {
  const page = pages.find(p => p.path === path);

  if (page && page?.rules?.includes(rules)) {
    return true;
  }

  return false;
};
