export const base64ToBlob = (data) => {
  const rImageType = /data:(image\/.+);base64,/;
  let mimeString = "";
  let raw, uInt8Array, i;

  raw = data.replace(rImageType, (header, imageType) => {
    mimeString = imageType;

    return "";
  });

  raw = atob(raw);
  const rawLength = raw.length;
  uInt8Array = new Uint8Array(rawLength); // eslint-disable-line

  for (i = 0; i < rawLength; i += 1) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: mimeString });
};