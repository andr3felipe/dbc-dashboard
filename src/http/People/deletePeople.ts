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
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ2ZW1zZXItYXBpIiwianRpIjoiNjY1IiwiY2FyZ29zIjpbXSwiaWF0IjoxNzA3MDg3MTMyLCJleHAiOjE3MDcxNzM1MzJ9.yWXOssEoaZPebI9dFRUxmuRrJmAjnQjtDpCgMsnU-Nc",
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
