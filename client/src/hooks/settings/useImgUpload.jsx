import React from "react";

const useImgUpload = () => {
  const {
    fileInputRef,
    file,
    uploadProgress,
    isUploading,
    handleCancel,
    handleFileChange,
    handleDragOver,
    handleDrop,
    handleSubmit,
  } = useFileUpload(isOpen, onClose, profile, dispatch);

  const { profile } = useSelector((state) => state.profile);
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const [intervalId, setIntervalId] = useState(null);

  const dispatch = useDispatch();

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
      alert("File size should not be more than 10MB");
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/x-icon",
    ];
    if (!allowedTypes.includes(selectedFile.type)) {
      alert(
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

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleFileChange(e);
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

  return {
    fileInputRef,
    file,
    uploadProgress,
    isUploading,
    handleCancel,
    handleFileChange,
    handleDragOver,
    handleDrop,
    handleSubmit,
  };
};

export default useImgUpload;
