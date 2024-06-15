import React, { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { AuthContext } from "../../services/AuthProvider";
import {
  submitMaterial,
  checkMaterialStatus,
  fetchProcessedPhrases,
} from "../../services/api/material";
import { Phrase } from "../../types";
import {
  Progress,
  Input,
  Textarea,
  Button,
  Tabs,
  Tab,
} from "@nextui-org/react";
import MaterialTabs from "../MaterialTabs";
interface MaterialFormInputs {
  title: string;
  content: string;
}

const SubmitMaterialForm: React.FC = () => {
  const authContext = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
  } = useForm<MaterialFormInputs>();
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [responsePhraseText, setResponsePhraseText] = useState<Phrase[]>([]);
  const [materialID, setMaterialID] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);

  const variant = "underlined";
  const onSubmit: SubmitHandler<MaterialFormInputs> = async (data) => {
    setError("");
    setSuccess("");
    setResponsePhraseText([]);
    setLoading(true);

    if (!authContext?.user) {
      setError("You must be logged in to submit an material.");
      setLoading(false);
      return;
    }

    try {
      const response = await submitMaterial(
        data,
        await authContext.user.getIdToken()
      );
      console.log("Submitted material:", response);
      const id = response.id;
      setMaterialID(id);
      setSuccess("Material submitted successfully! Processing...");

      pollMaterialStatus(id);
    } catch (error) {
      console.error("Error submitting material:", error);
      setError("Error submitting material: " + (error as Error).message);
      setLoading(false);
    }
  };

  const pollMaterialStatus = async (materialID: number) => {
    const interval = setInterval(async () => {
      try {
        const response = await checkMaterialStatus(materialID);
        if (response.status === "completed") {
          clearInterval(interval);
          await fetchPhrases(materialID);
        } else if (response.status === "failed") {
          clearInterval(interval);
          setError("Failed to process the material.");
          setLoading(false);
        }
      } catch (error) {
        clearInterval(interval);
        setError("Error checking material status: " + (error as Error).message);
        setLoading(false);
      }
    }, 5000);
  };

  const fetchPhrases = async (materialID: number) => {
    try {
      const responsePhrasesData: Phrase[] = await fetchProcessedPhrases(
        materialID
      );

      setResponsePhraseText(responsePhrasesData);
      setSuccess("Material processed successfully!");
    } catch (error) {
      console.error("Error fetching processed phrases:", error);
      setError("Error fetching processed phrases: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="font-bold text-4xl pb-5 text-emerald-300 ">
        New Material
      </h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>
            <h2 className="font-bold text-2xl pb-2 pl-2">Title</h2>
            <Input
              {...register("title", {
                required: "Title is required.",
                maxLength: {
                  value: 100,
                  message: "Title cannot exceed 100 characters.",
                },
              })}
              type="text"
              variant="bordered"
              size="lg"
              isInvalid={isSubmitted && !!errors.title}
              color={isSubmitted && errors.title ? "danger" : "default"}
              errorMessage={
                isSubmitted && errors.title ? errors.title.message : ""
              }
            />
          </label>
        </div>
        <div className="py-5">
          <label>
            <h2 className="font-bold text-2xl pb-2 pl-2">Content</h2>
            <Textarea
              {...register("content", {
                required: "Content is required.",
                maxLength: {
                  value: 2000,
                  message: "Content cannot exceed 2000 characters.",
                },
              })}
              type="text"
              variant="bordered"
              size="lg"
              isInvalid={isSubmitted && !!errors.content}
              color={isSubmitted && errors.content ? "danger" : "default"}
              errorMessage={
                isSubmitted && errors.content ? errors.content.message : ""
              }
              minRows={10}
              maxRows={100}
            />
          </label>
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="ghost"
            size="lg"
            className="font-semibold  py-3 px-5 text-lg border-2 text-blue-400 border-blue-400"
          >
            Submit
          </Button>
        </div>
        {loading && (
          <Progress isIndeterminate aria-label="Loading..." color="danger" />
        )}
      </form>
      <MaterialTabs responsePhraseText={responsePhraseText} />
    </div>
  );
};

export default SubmitMaterialForm;
