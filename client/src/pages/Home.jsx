import { Link } from "react-router-dom";
import { CallToAction, PostCard } from "../components";
import { useEffect, useState } from "react";
import { Button } from "flowbite-react";

export default function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch("/api/post/getPosts");
            const data = await res.json();
            setPosts(data.posts);
        };
        fetchPosts();
    }, []);
    return (
        <div>
            <div className="flex flex-col min-h-screen gap-6 p-28 px-3 max-w-6xl mx-auto ">
                <h1 className="text-3xl font-bold lg:text-6xl">
                    Welcome to DaXuBa Blog
                </h1>
                <div className="mt-2 flex gap-6">
                    <div className="flex-1">
                        <h2 className="text-2xl font-semibold text-red-500">
                            Khám phá những câu chuyện thú vị
                        </h2>
                        <ul className="list-disc list-inside mt-2">
                            <li>
                                Chương trình thi đua: Dành cho nhân viên. Hãy
                                theo dõi để không bỏ lỡ cơ hội nhận giải thưởng
                                hấp dẫn!
                            </li>
                            <li>
                                Những khoảnh khắc đáng nhớ: Những hình ảnh,
                                video và câu chuyện ghi lại những khoảnh khắc
                                thú vị.
                            </li>
                            <li>
                                Các thông báo quan trọng: Cập nhật thông tin mới
                                nhất từ chị Lan xinh đẹp.
                            </li>
                        </ul>
                        <div className="flex justify-center mt-6">
                            <Button
                                gradientDuoTone="pinkToOrange"
                                onClick={() =>
                                    (window.location.href = "/search")
                                }
                                className="px-4 py-1 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
                            >
                                Xem tất cả bài viết
                            </Button>
                        </div>
                    </div>
                    {/* Image on the right */}
                    <div className="w-60 h-72 bg-gray-300 rounded-lg overflow-hidden me-10">
                        <img
                            src="/Lan_cp.png"
                            alt="Image"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
            <div className="p-3 bg-amber-100 dark:bg-slate-700">
                <CallToAction />
            </div>

            <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
                {posts && posts.length > 0 && (
                    <div className="flex flex-col gap-6">
                        <h2 className="text-2xl font-semibold text-center">
                            TIN MỚI NHẤT
                        </h2>
                        <div className="flex flex-wrap gap-4">
                            {posts.map((post) => (
                                <PostCard key={post._id} post={post} />
                            ))}
                        </div>
                        <Link
                            to={"/search"}
                            className="text-lg text-teal-500 hover:underline text-center"
                        >
                            XEM TẤT CẢ BÀI VIẾT
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
