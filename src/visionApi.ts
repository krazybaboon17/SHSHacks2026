async function resizeImageIfNeeded(file: File, maxDim = 1600): Promise<Blob> {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      let { width, height } = img;
      if (width <= maxDim && height <= maxDim && file.size < 3.5 * 1024 * 1024) {
        resolve(file);
        return;
      }
      if (width > height) {
        if (width > maxDim) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        }
      } else {
        if (height > maxDim) {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(file);
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          resolve(blob || file);
        },
        'image/jpeg',
        0.85,
      );
    };
    img.onerror = () => resolve(file);
    img.src = url;
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
