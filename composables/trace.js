export const useTrace = () => {
  const trace = useState("trace", () => {
    return {};
  });

  return { trace };
};
