import React, { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { AuthContext } from "../../services/AuthProvider";
import {
  submitArticle,
  checkArticleStatus,
  fetchProcessedPhrases,
} from "../../services/api/article";
import { Phrase } from "../../types";
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
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [responseText, setResponseText] = useState<string[]>([]);
  const [articleID, setArticleID] = useState<number>();

  const onSubmit: SubmitHandler<ArticleFormInputs> = async (data) => {
    setError("");
    setSuccess("");
    setResponseText([]);

    if (!authContext?.user) {
      setError("You must be logged in to submit an article.");
      return;
    }

    try {
      const response = await submitArticle(
        data,
        await authContext.user.getIdToken()
      );
      console.log("Submitted article:", response);
      const id = response.id;
      setArticleID(id);
      setSuccess("Article submitted successfully! Processing...");

      pollArticleStatus(id);
      reset();
    } catch (error) {
      console.error("Error submitting article:", error);
      setError("Error submitting article: " + (error as Error).message);
    }
  };

  const pollArticleStatus = async (articleID: number) => {
    const interval = setInterval(async () => {
      try {
        const response = await checkArticleStatus(articleID);
        if (response.status === "completed") {
          clearInterval(interval);
          await fetchPhrases(articleID);
        } else if (response.status === "failed") {
          clearInterval(interval);
          setError("Failed to process the article.");
        }
      } catch (error) {
        clearInterval(interval);
        setError("Error checking article status: " + (error as Error).message);
      }
    }, 5000);
  };

  const fetchPhrases = async (articleID: number) => {
    try {
      const responseData: Phrase[] = await fetchProcessedPhrases(articleID);
      const texts = responseData.map((phrase: Phrase) => phrase.Text);
      setResponseText(texts);
      setSuccess("Article processed successfully!");
    } catch (error) {
      console.error("Error fetching processed phrases:", error);
      setError("Error fetching processed phrases: " + (error as Error).message);
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
            Text:
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
      {responseText.length > 0 && (
        <div>
          <h3>Processed Content</h3>
          <ul>
            {responseText.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SubmitArticleForm;
