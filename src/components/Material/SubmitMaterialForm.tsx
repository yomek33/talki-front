import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { submitMaterial } from "../../services/api/material";
import { Material } from "../../types";
import { Input, Textarea, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../../globalState/user";

interface MaterialFormInputs {
  title: string;
  content: string;
}

interface SubmitMaterialFormProps {
  onMaterialSubmit: (material: Material) => void;
}

const SubmitMaterialForm: React.FC<SubmitMaterialFormProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<MaterialFormInputs>();
  const [error, setError] = useState<string>("");
  const [, setSuccess] = useState<string>("");
  const [, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [user] = useAtom(userAtom);
  // const token = user?.idToken;

  const onSubmit: SubmitHandler<MaterialFormInputs> = async (data) => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await submitMaterial(data);
      console.log("Submitted material:", response);
      const id = response.id;
      setSuccess("Material submitted successfully! Processing...");
      navigate(`/material/${id}`);
    } catch (error) {
      console.error("Error submitting material:", error);
      setError("Error submitting material: " + (error as Error).message);
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
      </form>
    </div>
  );
};

export default SubmitMaterialForm;
