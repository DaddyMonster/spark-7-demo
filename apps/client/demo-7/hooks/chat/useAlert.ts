export function useAlert() {
  const onAlert = async () => {
    console.log('ALERT!');
  };

  return { onAlert };
}
