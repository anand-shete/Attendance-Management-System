export default function Demo() {
  return (
    <div className="flex flex-col justify-center items-center space-y-5">
      <h1 className="mt-30 text-2xl md:text-4xl">Demo Video</h1>
      <p className="text-md md:text-xl">Click Below to Play the Demo video!</p>
      <iframe
        src="https://www.youtube.com/embed/q1NrGr6ikPM?si=5P_xhRLImXMHeLrm"
        title="Demo Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="h-[75vh] w-[75vw]"
      ></iframe>
    </div>
  );
}
