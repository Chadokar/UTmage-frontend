export const a = 0;

//   const { data, error, isLoading }: UseQueryResult<Error> = useQuery({
//     queryKey: ["data"],
//     queryFn: async () => {
//       const response = await fetch("/api/user");
//       if (!response.ok) {
//         throw new Error("Network response was not ok.");
//       }
//       const data = await response.json();
//       return data;
//     },
//   });
