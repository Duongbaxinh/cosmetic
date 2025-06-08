import { MESS_ERROR } from "@/config/mess.config";
import { toast } from "react-toastify";

export const uploadFile = async (acceptedFiles: File[]) => {
  try {
    const uploadPromises = acceptedFiles.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "joyboybeauty"); // Thay bằng preset của bạn
      formData.append("folder", "JOYBOY");
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dwu92ycra/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();

      if (response.ok) {
        return data.secure_url;
      }
      throw new Error(data.error?.message || "Upload failed");
    });

    const urls = await Promise.all(uploadPromises);
    return urls;
  } catch (err) {
    console.error(err);
  } finally {
  }
};

export const handleThumbnailChange = async (
  index: number,
  e: React.ChangeEvent<HTMLInputElement>,
  previewImages: (string | null)[],
  setPreviewImages: React.Dispatch<React.SetStateAction<(string | null)[]>>
) => {
  try {
    const file = e.target.files?.[0];

    if (file) {
      const urlFile = await uploadFile([file]);
      if (urlFile && urlFile[0]) {
        const newImages = [...previewImages];
        newImages[index] = urlFile[0];
        setPreviewImages(newImages);
      } else {
        toast.error(MESS_ERROR.SYSTEM_ERROR_UPLOAD);
      }
    }
  } catch (error) {
    toast.error(MESS_ERROR.SYSTEM_ERROR_UPLOAD);
  }
};

export const handleImagesChange = async (
  index: number,
  e: React.ChangeEvent<HTMLInputElement>,
  uploadedImages: string[][],
  setUploadedImages: React.Dispatch<React.SetStateAction<string[][]>>
) => {
  try {
    const files = e.target.files;
    if (files) {
      const fileArr = Array.from(files);
      const urlFile = await uploadFile(fileArr);

      setUploadedImages((prev) => {
        const newImages = [...prev];
        newImages[index] = [...(newImages[index] || []), ...(urlFile || [])];
        return newImages;
      });
    }
  } catch (error) {
    toast.error(MESS_ERROR.SYSTEM_ERROR_UPLOAD);
  }
};
