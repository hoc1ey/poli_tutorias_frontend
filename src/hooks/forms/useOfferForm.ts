import { useState } from "react";
import { AvailableCareers, OfferFormInputs, Subject } from "@/interfaces";
import { useForm } from "react-hook-form";

export const useOfferForm = (availableCareersAndSubjects: AvailableCareers) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    setValue,
    resetField,
  } = useForm<OfferFormInputs>();

  const [careerSelectTextColor, setCareerSelectTextColor] =
    useState("text-(--grey)");
  const [modeSelectTextColor, setModeSelectTextColor] =
    useState("text-(--grey)");
  const [subjectSelectTextColor, setSubjectSelectTextColor] =
    useState("text-(--grey)");
  const [selectedSubject, setSelectedSubject] = useState<string>("default");

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const [availableSubjects, setAvailableSubjects] = useState<
    Subject[] | null
  >();

  const handleSelectOnChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    type: string
  ) => {
    switch (type) {
      case "career":
        setCareerSelectTextColor("text-(--dark-blue)");
        setAvailableSubjects(
          availableCareersAndSubjects.careers.find(
            (career) => career.careerId === event.target.value
          )?.subjects || []
        );
        setSelectedSubject("default");
        setSubjectSelectTextColor("text-(--grey)");
        resetField("subject", { defaultValue: "default" });
        break;
      case "mode":
        setModeSelectTextColor("text-(--dark-blue)");
        break;
      case "subject":
        setSubjectSelectTextColor("text-(--dark-blue)");
        setSelectedSubject(event.target.value);
        break;
    }
  };

  return {
    careerSelectTextColor,
    modeSelectTextColor,
    subjectSelectTextColor,
    selectedSubject,
    uploadedFile,
    setUploadedFile,
    availableSubjects,
    handleSelectOnChange,
    handleSubmit,
    register,
    errors,
    isValid,
    setValue,
  };
};
