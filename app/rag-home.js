// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
//       <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={100}
//           height={20}
//           priority
//         />
//         <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
//           <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
//             To get started, edit the page.js file.
//           </h1>
//           <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
//             Looking for a starting point or more instructions? Head over to{" "}
//             <a
//               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Templates
//             </a>{" "}
//             or the{" "}
//             <a
//               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Learning
//             </a>{" "}
//             center.
//           </p>
//         </div>
//         <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
//           <a
//             className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={16}
//               height={16}
//             />
//             Deploy Now
//           </a>
//           <a
//             className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Documentation
//           </a>
//         </div>
//       </main>
//     </div>
//   );
// }



// "use client";

// import { useState } from "react";

// export default function Home() {
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [loading, setLoading] = useState(false);

//   async function askQuestion() {
//     if (!question.trim()) return;

//     setLoading(true);
//     setAnswer("");

//     try {
//       const res = await fetch("/api/chat", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           question,
//         }),
//       });

//       const data = await res.json();

//       setAnswer(data.answer);
//     } catch (err) {
//       console.error(err);
//       setAnswer("Something went wrong.");
//     }

//     setLoading(false);
//   }

//   return (
//     <main
//       style={{
//         maxWidth: "800px",
//         margin: "50px auto",
//         fontFamily: "Arial",
//       }}
//     >
//       <h1>Course RAG Chatbot</h1>

//       <textarea
//         rows="4"
//         style={{
//           width: "100%",
//           padding: "10px",
//         }}
//         placeholder="Ask something..."
//         value={question}
//         onChange={(e) => setQuestion(e.target.value)}
//       />

//       <br />
//       <br />

//       <button onClick={askQuestion}>
//         {loading ? "Thinking..." : "Ask"}
//       </button>

//       <br />
//       <br />

//       <h3>Answer</h3>

//       <div
//         style={{
//           border: "1px solid #ddd",
//           padding: "15px",
//           minHeight: "120px",
//           whiteSpace: "pre-wrap",
//         }}
//       >
//         {answer}
//       </div>
//     </main>
//   );
// }
"use client";

import { useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  async function askQuestion() {
    if (!question.trim()) return;

    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }

    setLoading(false);
  }

  return (
    <main
      style={{
        maxWidth: "850px",
        margin: "50px auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "32px",
          fontWeight: "700",
          marginBottom: "8px",
        }}
      >
        🎓 Course Transcript RAG Assistant
      </h1>

      <p
        style={{
          color: "#666",
          fontSize: "15px",
          marginBottom: "25px",
          lineHeight: "1.5",
        }}
      >
        Ask questions about the course videos and receive answers along with
        the lesson name and timestamp where the topic is explained.
      </p>

      <textarea
        rows={5}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Example: What is Expo?"
        style={{
          width: "100%",
          padding: "15px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          resize: "vertical",
          boxSizing: "border-box",
        }}
      />

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={askQuestion}
          disabled={loading}
          style={{
            padding: "10px 24px",
            backgroundColor: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          {loading ? "Searching..." : "Ask"}
        </button>
      </div>

      {result && (
        <div
          style={{
            marginTop: "30px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "20px",
            backgroundColor: "#fafafa",
          }}
        >
          <h2
            style={{
              marginTop: 0,
              marginBottom: "15px",
            }}
          >
            Answer
          </h2>

          <p
            style={{
              lineHeight: "1.7",
            }}
          >
            {result.answer}
          </p>

          {result.lesson && (
            <>
              <hr style={{ margin: "20px 0" }} />

              <h3
                style={{
                  marginBottom: "15px",
                }}
              >
                Source Information
              </h3>

              <p>
                <strong>Course:</strong> {result.course}
              </p>

              <p>
                <strong>Module:</strong> {result.module}
              </p>

              <p>
                {/* <strong>Lesson:</strong> {result.lesson} */}
                {result.lesson
                  ?.replace("_epm", "")
                  .replace(/_/g, " ")
                  .replace(/-/g, " ")}
              </p>
              <p>
                {/* <strong>Timestamp:</strong> {result.start} - {result.end} */}
                  <strong>Timestamp:</strong>{" "}
                  {result.start
                    ?.replace(",", ".")
                    .split(".")[0]
                    .substring(3)}{" "}
                  -{" "}
                  {result.end
                    ?.replace(",", ".")
                    .split(".")[0]
                    .substring(3)}

              </p>
            </>
          )}
        </div>
      )}
    </main>
  );
}