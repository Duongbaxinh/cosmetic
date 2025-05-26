export const handleError = (error: any) => {
  if (
    "data" in error &&
    error.data &&
    typeof error.data === "object" &&
    "detail" in error.data
  ) {
    alert(error.data.detail);
  } else {
    // alert("An unknown error occurred.");
  }
};
