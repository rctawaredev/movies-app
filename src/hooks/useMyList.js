import { useEffect, useState } from "react";

const STORAGE_KEY = "my_list";

const readList = () => {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
};

const writeList = (list) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
};

export const useMyList = () => {
  const [list, setList] = useState(() => readList());

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === STORAGE_KEY) {
        setList(readList());
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const isInList = (id) => {
    return list.some((item) => item.id === id);
  };

  const addToList = (movie) => {
    setList((prev) => {
      if (prev.some((item) => item.id === movie.id)) return prev;
      const updated = [...prev, movie];
      writeList(updated);
      return updated;
    });
  };

  const removeFromList = (id) => {
    setList((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      writeList(updated);
      return updated;
    });
  };

  const toggle = (movie) => {
    setList((prev) => {
      const exists = prev.some((item) => item.id === movie.id);
      const updated = exists
        ? prev.filter((item) => item.id !== movie.id)
        : [...prev, movie];
      writeList(updated);
      return updated;
    });
  };

  const clear = () => {
    setList([]);
    writeList([]);
  };

  return {
    list,
    isInList,
    addToList,
    removeFromList,
    toggle,
    clear,
  };
};

