export const useActivity = () => {
  const activity = useState("activity", () => {
    return {
      info: {
        flyer: false,
        photo: false,
        video: false,
        release: false,
      },
      // outcome: [],
      // attendance: [],
      Discussions: [],
      // todo: [],
      summary: "",
    };
  });

  return { activity };
};
