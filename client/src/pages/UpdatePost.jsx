/* eslint-disable no-unused-vars */
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useEffect, useState, useCallback } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function UpdatePost() {
    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formData, setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);
    const { postId } = useParams();

    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`/api/post/getposts?postId=${postId}`);
                const data = await res.json();
                if (!res.ok) {
                    setPublishError(data.message);
                    return;
                }
                setFormData(data.posts[0]);
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchPost();
    }, [postId]);

    const handleUploadImage = useCallback(async () => {
        try {
            if (!file) {
                setImageUploadError("Please select an image");
                return;
            }
            setImageUploadError(null);
            const storage = getStorage(app);
            const fileName = new Date().getTime() + "-" + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageUploadProgress(progress.toFixed(0));
                },
                (error) => {
                    setImageUploadError("Image upload failed");
                    setImageUploadProgress(null);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        (downloadURL) => {
                            setImageUploadProgress(null);
                            setImageUploadError(null);
                            setFormData((prevFormData) => ({
                                ...prevFormData,
                                image: downloadURL,
                            }));
                        }
                    );
                }
            );
        } catch (error) {
            setImageUploadError("Image upload failed");
            setImageUploadProgress(null);
            console.log(error);
        }
    }, [file]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: value,
        }));
    };

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            console.log("Form Data ID:", formData._id); // Kiểm tra giá trị formData._id
            try {
                const res = await fetch(
                    `/api/post/updatepost/${formData._id}/${currentUser._id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(formData),
                    }
                );
                const data = await res.json();
                if (!res.ok) {
                    setPublishError(data.message);
                    return;
                }
                navigate(`/post/${data.slug}`);
            } catch (error) {
                setPublishError("Something went wrong");
            }
        },
        [formData, currentUser._id, navigate]
    );

    return (
        <div className="p-3 max-w-3xl mx-auto min-h-screen">
            <h1 className="text-center text-3xl my-7 font-semibold">
                Update post
            </h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4 sm:flex-row justify-between">
                    <TextInput
                        type="text"
                        placeholder="Title"
                        required
                        id="title"
                        className="flex-1"
                        onChange={handleChange}
                        value={formData.title}
                    />
                    <Select
                        id="category"
                        onChange={handleChange}
                        value={formData.category}
                    >
                        <option value="news">Tin tức</option>
                        <option value="introduction">Giới thiệu</option>
                        <option value="announcement">Thông báo</option>
                        <option value="tutorial">Hướng dẫn</option>
                    </Select>
                </div>
                <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
                    <FileInput
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <Button
                        type="button"
                        gradientDuoTone="purpleToBlue"
                        size="sm"
                        outline
                        onClick={handleUploadImage}
                        disabled={imageUploadProgress}
                    >
                        {imageUploadProgress ? (
                            <div className="w-16 h-16">
                                <CircularProgressbar
                                    value={imageUploadProgress}
                                    text={`${imageUploadProgress || 0}%`}
                                />
                            </div>
                        ) : (
                            "Upload Image"
                        )}
                    </Button>
                </div>
                {imageUploadError && (
                    <Alert color="failure">{imageUploadError}</Alert>
                )}
                {formData.image && (
                    <img
                        src={formData.image}
                        alt="upload"
                        className="w-full h-72 object-cover"
                    />
                )}
                <ReactQuill
                    theme="snow"
                    value={formData.content}
                    placeholder="Write something..."
                    className="h-72 mb-12"
                    required
                    onChange={(value) => {
                        setFormData({ ...formData, content: value });
                    }}
                />
                <Button type="submit" gradientDuoTone="purpleToPink">
                    Update post
                </Button>
                {publishError && (
                    <Alert className="mt-5" color="failure">
                        {publishError}
                    </Alert>
                )}
            </form>
        </div>
    );
}
