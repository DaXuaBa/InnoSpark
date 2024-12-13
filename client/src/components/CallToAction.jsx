import { Button } from "flowbite-react";

export default function CallToAction() {
    return (
        <div className="flex flex-col sm:flex-row p-3 border border-red-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
            <div className="flex-1 justify-center flex flex-col">
                <h2 className="text-2xl">
                    Muốn biết nhiều hơn về Viettel Post?
                </h2>
                <p className="text-gray-500 my-2">
                    Hãy vào Google! Chứ đừng tìm ở đây.
                </p>
                <Button
                    gradientDuoTone="pinkToOrange"
                    className="w-70 mx-auto rounded-tl-xl rounded-bl-none rounded-br-xl rounded-tr-none"
                >
                    <a
                        href="https://www.facebook.com/profile.php?id=100085009712661"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Khám Phá Viettel Post Tân Biên
                    </a>
                </Button>
            </div>
            <div className="p-7 flex-1">
                <img src="theme.png" />
            </div>
        </div>
    );
}
