export const useProject = () => {
  const project = useState("project", () => {
    return {
      project: {
        CategoryId: "",
        title: "",
        location: "",
        start: "",
        end: "",
        background: "",
        status: 1,
      },
      ProjectRundown: [],
      ProjectInvitation: [],
      Sinergy: [],
      ProjectIndicators: [],
    };
  });

  return { project };
};
