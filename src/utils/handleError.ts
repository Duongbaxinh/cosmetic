export const handleError = (error: any) => {
  console.log("Login error:", error);
  if (
    "data" in error &&
    error.data &&
    typeof error.data === "object" &&
    "detail" in error.data
  ) {
    // @ts-ignore
    alert(error.data.detail);
  } else {
    alert("An unknown error occurred.");
  }
};
