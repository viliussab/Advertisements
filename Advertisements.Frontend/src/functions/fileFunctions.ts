const toBase64Async = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const dataWithMetadata = reader?.result?.toString();
      const data = dataWithMetadata?.replace(/^.*,/, '');

      resolve(data as string);
    };
    reader.onerror = (error) => reject(error);
  });

const fileFunctions = {
  toBase64Async,
};

export default fileFunctions;
