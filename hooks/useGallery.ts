import { useState, useEffect, useCallback } from "react";
import { GalleryImage } from "../lib/types";
import { getGallery } from "../lib/api";

export function useGallery(category?: string) {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getGallery(category);
      setImages(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load gallery");
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => { fetchImages(); }, [fetchImages]);

  return { images, loading, error, refetch: fetchImages };
}
