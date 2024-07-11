export const useProgram = () => {
  const dataProgram = useState("dataProgram", () => {
    return {
      program: {},
      vision: [],
      driver: [],
      indicator: [],
      phase: [],
      PartnerPosition: [],
      partner: [],
      priority: [],
    };
  });

  return { dataProgram };
};
