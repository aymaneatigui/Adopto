import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { ProfilePictureIcon } from "../../../../Icons/Icons.jsx";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../../../features/profile/profileActions.jsx";

// eslint-disable-next-line react/prop-types
const Modalimg = ({ isOpen, onClose }) => {
  const { profile } = useSelector((state) => state.profile);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const [intervalId, setIntervalId] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleFileChange(e);
  };

  const handleFileChange = async (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else {
      files = e.target.files;
    }

    if (intervalId) {
      clearInterval(intervalId);
      setUploadProgress(0);
      setIsUploading(false);
    }

    const selectedFile = files[0];
    console.log(selectedFile);

    if (selectedFile.size > 10 * 1024 * 1024) {
      console.log("File size should not be more than 10MB");
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/x-icon",
    ];
    if (!allowedTypes.includes(selectedFile.type)) {
      console.log(
        "Invalid file type. Only jpeg, jpg, png, and icon files are allowed",
      );
      return;
    }

    setFile(URL.createObjectURL(files[0]));
    // Simulate upload progress
    let progress = 0;
    setIsUploading(true);
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress === 100) {
        clearInterval(interval);
        setIsUploading(false);
      }
    }, 500);
    setIntervalId(interval);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    // Now you can use binaryImage in your submit logic
    const originalFile = fileInputRef.current.files[0];
    const file = new File([originalFile], profile.username + "-profile", {
      type: originalFile.type,
    });
    dispatch(updateProfile({ picture: file }));

    // Reset state
    setFile(null);
    setUploadProgress(0);
    setIsUploading(false);

    // Clear the interval
    clearInterval(intervalId);
    setIntervalId(null);

    onClose(false);
  };

  const handleCancel = (event) => {
    event.preventDefault();

    // Reset state
    setFile(null);
    setUploadProgress(0);
    setIsUploading(false);

    // Clear the interval
    clearInterval(intervalId);
    setIntervalId(null);

    // Close the modal
    onClose(false);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA6 fixed inset-0 data-[state=open]:animate-overlayShow" />
        <Dialog.Content
          onClick={(e) => e.stopPropagation()}
          className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[state=open]:animate-contentShow focus:outline-none"
        >
          <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            Edit profile
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="mt-2">
            <div className="mt-2  rounded-lg border border-dashed border-gray-900/25">
              <label
                htmlFor="file-upload"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="relative flex h-full w-full  cursor-pointer justify-center rounded-md bg-white px-6 py-10 font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <div>
                  <div className="text-center">
                    {file ? (
                      <img
                        src={file}
                        className="mx-auto h-20 w-20"
                        alt="Uploaded file"
                      />
                    ) : (
                      <div className="mx-auto h-20 w-20 text-gray-300">
                        <ProfilePictureIcon
                          className="h-full w-full"
                          aria-hidden="true"
                        />
                      </div>
                    )}
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <span className="text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                        Upload a file
                      </span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                      />
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                  {uploadProgress > 0 && (
                    <div className="mt-4">
                      <progress value={uploadProgress} max="100" />
                    </div>
                  )}
                </div>
              </label>
            </div>
            <button
              type="submit"
              disabled={isUploading}
              className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
            >
              Save changes
            </button>
            <button
              onClick={handleCancel}
              className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
            >
              Cancel
            </button>
          </form>
          <div className="mt-[25px] flex justify-end">
            {/* <Dialog.Close asChild>
              <button
                type="submit"
                disabled={isUploading}
                className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
              >
                Save changes
              </button>
            </Dialog.Close> */}
          </div>
          <Dialog.Close asChild>
            <button
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full "
              aria-label="Close"
              onClick={handleCancel}
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modalimg;
