/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const categoryLabels = {
    news: "Tin tức",
    introduction: "Giới thiệu",
    announcement: "Thông báo",
    tutorial: "Hướng dẫn",
};

export default function PostCard({ post }) {
    return (
        <div className="group relative w-full border border-red-400 hover:border-2 h-[270px] overflow-hidden rounded-lg sm:w-[270px] transition-all">
            <Link to={`/post/${post.slug}`}>
                <img
                    src={post.image}
                    alt="post cover"
                    className="h-[170px] w-full  object-cover group-hover:h-[115px] transition-all duration-300 z-20"
                />
            </Link>
            <div className="p-3 flex flex-col gap-2">
                <Link
                    to={`/post/${post.slug}`}
                    className="text-base font-semibold line-clamp-2"
                >
                    {post.title}
                </Link>
                <div className="flex justify-between items-center text-sm italic">
                    <span>{categoryLabels[post.category]}</span>
                    <span>
                        {new Date(post.updatedAt).toLocaleDateString("vi-VN", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </span>
                </div>
                <Link
                    to={`/post/${post.slug}`}
                    className="z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none rounded-br-xs rounded-tr-none m-2"
                >
                    Xem chi tiết
                </Link>
            </div>
        </div>
    );
}
