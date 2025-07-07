export default function PostBody({ poster, content }) {
  return (
    <div className="border-b border-[#3F3F3F] py-4 lg:py-5 lg:text-xl">
      <div className="flex items-center justify-center overflow-hidden">
        {poster && (
          <img
            className="max-w-full mb-3"
            src={`${import.meta.env.VITE_SERVER_BASE_URL}/${poster}`}
            alt="poster"
          />
        )}
      </div>
      <p>{content ?? "No content Available"}</p>
    </div>
  );
}
