export const convertURLToFile = async (url) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const contentType = response.headers.get('content-type');
    const filename = url.split('\\').pop();
    return new File([blob], filename, { contentType });
  } catch (err) {
    console.error(err);
  }
};
