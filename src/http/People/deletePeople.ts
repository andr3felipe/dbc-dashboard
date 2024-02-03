interface DeleteUserProps {
  userId: string;
}

export const deleteUser = async ({ userId }: DeleteUserProps) => {
  try {
    console.log("Deleting user with ID:", userId);

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/pessoa/${userId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ2ZW1zZXItYXBpIiwianRpIjoiMiIsImNhcmdvcyI6WyJST0xFX1VTVUFSSU8iLCJST0xFX0FETUlOIiwiUk9MRV9NQVJLRVRJTkciXSwiaWF0IjoxNzA2ODk4ODU3LCJleHAiOjE3MDY5ODUyNTd9.0L-rbWjbd5DU-1r77-T7K8aK7jOMc0pAwSubXtBC0AU",
        },
      }
    );

    console.log("Response:", response);

    if (!response.ok) {
      throw new Error(`Failed to delete user. Status: ${response.status}`);
    }

    console.log("User deleted successfully");
  } catch (error) {
    console.error("Error in deleteUser:", error);
    throw new Error(`Failed to delete user: ${error}`);
  }
};
