import React, { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { AuthContext } from "../api/AuthProvider";

export interface Article {
  id: string;
  title: string;
  content: string;
}

interface ArticleFormInputs {
  title: string;
  content: string;
}

const SubmitArticleForm: React.FC = () => {
  const authContext = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ArticleFormInputs>();
  const [error, setError] = React.useState<string>("");
  const [success, setSuccess] = React.useState<string>("");

  const onSubmit: SubmitHandler<ArticleFormInputs> = async (data) => {
    setError("");
    setSuccess("");

    if (!authContext?.user) {
      setError("You must be logged in to submit an article.");
      return;
    }

    try {
      const response = await fetch("/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await authContext.user.getIdToken()}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit article");
      }

      setSuccess("Article submitted successfully!");
      reset();
    } catch (error) {
      setError("Error submitting article: " + (error as Error).message);
    }
  };

  return (
    <div>
      <h2>Submit an Article</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>
            Title:
            <input {...register("title", { required: "Title is required" })} />
          </label>
          {errors.title && (
            <p style={{ color: "red" }}>{errors.title.message}</p>
          )}
        </div>
        <div>
          <label>
            Content:
            <textarea
              {...register("content", { required: "Content is required" })}
            />
          </label>
          {errors.content && (
            <p style={{ color: "red" }}>{errors.content.message}</p>
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SubmitArticleForm;
