async function resizeImageIfNeeded(file: File): Promise<Blob> {
  if (file.size < 3.5 * 1024 * 1024) return file;
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      let { width, height } = img;
      const maxDim = 1600;
      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return resolve(file);
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob((blob) => resolve(blob || file), 'image/jpeg', 0.85);
    };
    img.onerror = () => resolve(file);
    img.src = URL.createObjectURL(file);
  });
}

export async function readSketch(photo: File) {
  const preparedPhoto = await resizeImageIfNeeded(photo);
  const form = new FormData();
  form.append('file', preparedPhoto, 'sketch.jpg');

  let response: Response;
  try {
    response = await fetch('/api/processImage', { method: 'POST', body: form });
  } catch {
    throw new Error("Couldn't reach the backend. Is the Python server running?");
  }

  if (!response.ok) {
    throw new Error(`The backend had a problem reading the sketch (error ${response.status}). Try again or use a clearer photo.`);
  }
  return response.json();
}
