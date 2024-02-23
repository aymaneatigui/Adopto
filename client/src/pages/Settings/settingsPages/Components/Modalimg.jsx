import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon, UploadIcon } from "@radix-ui/react-icons";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../../../features/profile/profileActions.jsx";
// import { setUploadProgress } from "../../../../features/profile/profileSlice.jsx";

// eslint-disable-next-line react/prop-types
const Modalimg = ({ isOpen, onClose }) => {
  const { uploadProgress } = useSelector((state) => state.profile);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const [fileUrl, setFileUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  // const [intervalId, setIntervalId] = useState(null);

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

    const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;

    // if (intervalId) {
    //   clearInterval(intervalId);
    //   dispatch(setUploadProgress(0));
    //   setIsUploading(false);
    // }

    const selectedFile = files[0];

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

    setFile(selectedFile);
    setFileUrl(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      console.log("Please select a file");
      return;
    }

    setIsUploading(true);
    await dispatch(updateProfile({ picture: file }));
    setIsUploading(false);

    setTimeout(() => {
      // Reset state
      setFileUrl(null);
      setFile(null);

      // Clear the input field
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }

      // Close the modal
      onClose(false);
    }, 1000);
  };

  const handleCancel = (event) => {
    event.preventDefault();

    // Reset state
    setFileUrl(null);
    setFile(null);
    setIsUploading(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }

    // Close the modal
    onClose(false);
  };

  // const handleInterval = () => {
  //   dispatch(setUploadProgress(uploadProgress + 2));

  //   if (uploadProgress >= 100) {
  //     clearInterval(intervalId);
  //     setIsUploading(false);
  //     dispatch(setUploadProgress(0));
  //   }  };

  // useEffect(() => {
  //    // Start the interval to simulate upload progress
  //    if (isUploading) {
  //     const newIntervalId = setInterval(handleInterval, 50);
  //     setIntervalId(newIntervalId);
  //   } else {
  //     clearInterval(intervalId);
  //     setIntervalId(null);
  //   }
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [isUploading, intervalId, uploadProgress]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA6 fixed inset-0 data-[state=open]:animate-overlayShow" />
        <Dialog.Content
          onClick={(e) => e.stopPropagation()}
          className="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[state=open]:animate-contentShow focus:outline-none"
        >
          <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            Edit profile
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="mt-2">
            <div className="mt-2  rounded-lg border border-dashed border-gray-900/25">
              <div
                className={`h-1 w-full
                    ${uploadProgress > 0 ? "bg-neutral-200" : ""}
                `}
              >
                <div
                  className="h-1 bg-green-600"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <label
                htmlFor="file-upload"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="relative my-6 flex h-full  w-full cursor-pointer justify-center rounded-md bg-white px-6 font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <div>
                  <div className="text-center">
                    {fileUrl && file ? (
                      <div className="mx-auto h-24 w-24">
                        <img
                          src={fileUrl}
                          // className="mx-auto h-20 w-20"
                          className="h-full w-full rounded-full object-cover"
                          alt="Uploaded file"
                        />
                      </div>
                    ) : (
                      <div className="mx-auto h-20 w-20 flex justify-center items-center">

                      <div className="mx-auto h-12 w-12 text-gray-400">
                        <UploadIcon
                          className="h-full w-full"
                          aria-hidden="true"
                        />
                      </div>
                      </div>
                    )}
                    <div className="mt-4 flex text-sm leading-6 text-gray-600 xs:flex-col">
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
                </div>
              </label>
            </div>
            <div className="mt-3 flex w-full flex-row-reverse justify-start xs:flex-col">
              <button
                type="submit"
                disabled={isUploading}
                className="border-md mx-2 my-1 flex  cursor-pointer items-center justify-center whitespace-nowrap rounded-full border border-solid border-slate-900 bg-slate-900 px-5 py-2 text-base  text-slate-50 hover:bg-slate-800"
              >
                Save changes
              </button>
              <button
                onClick={handleCancel}
                className="mx-2 my-1 flex cursor-pointer items-center justify-center whitespace-nowrap  rounded-full border border-slate-300 px-5 py-2 text-base hover:bg-zinc-200  hover:bg-opacity-30 focus-visible:outline-none "
              >
                Cancel
              </button>
            </div>

            {/* <button
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
            </button> */}
          </form>
          {/* <div className="mt-[25px] flex justify-end"> */}
          {/* <Dialog.Close asChild>
              <button
                type="submit"
                disabled={isUploading}
                className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
              >
                Save changes
              </button>
            </Dialog.Close> */}
          {/* </div> */}
          <Dialog.Close asChild>
            <button
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus-visible:outline-none"
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
