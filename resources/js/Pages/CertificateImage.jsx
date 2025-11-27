<div
    id="certificateImage"
    className="relative w-full h-[600px] bg-white mx-auto border shadow-lg overflow-hidden"
    style={{
        backgroundImage: "url('/Certificate.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
    }}
>
    {/* Golden badge (You can remove if not needed) */}
    <div className="absolute top-24 left-1/2 -translate-x-1/2">
        <img src="/gold-badge.png" alt="badge" className="w-24 h-24" />
    </div>

    {/* Certificate Title */}
    <div className="absolute top-52 w-full text-center">
        <h1 className="text-4xl font-bold text-blue-600 tracking-wide">
            CERTIFICATE
        </h1>
        <h2 className="text-2xl font-semibold text-blue-600 -mt-2">
            OF APPRECIATION
        </h2>
    </div>

    {/* Presented To */}
    <div className="absolute top-[340px] w-full text-center">
        <p className="text-lg font-bold tracking-wide">
            PROUDLY PRESENTED TO :
        </p>

        {/* User name */}
        <p className="mt-2 text-3xl font-bold italic text-blue-700">
            {user?.name}
        </p>
    </div>

    {/* Achievement text */}
    <div className="absolute top-[420px] w-full text-center px-10">
        <p className="text-gray-700 leading-relaxed">
            Congratulations on your great achievement in completing the course:
            <br />
            <span className="font-semibold text-black">{course?.title}</span>
        </p>
    </div>

    {/* Signature */}
    <div className="absolute bottom-16 w-full text-center">
        <p className="text-xl font-bold">Khant Yadanar Moe</p>
        <hr className="my-1 mx-auto w-48 border-black" />
        <p className="font-semibold">FOUNDER</p>
    </div>
</div>;
