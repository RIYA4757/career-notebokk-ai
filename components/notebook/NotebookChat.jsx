"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNotebook } from "@/context/NotebookContext";

export default function NotebookChat() {
    const { selectedNotebook } = useNotebook();

    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(false);
    const [answer, setAnswer] = useState(null);

    async function askQuestion() {
        if (!question.trim()) return;

        setLoading(true);
        setAnswer(null);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    notebookId: selectedNotebook.id,
                    message: question,
                }),
            });

            const data = await response.json();
            setAnswer(data);
        } catch (err) {
            console.error(err);
            alert("Failed to get answer.");
        }

        setLoading(false);
    }

    return (
        <div className="mt-8 rounded-xl border bg-white p-6">
            <h2 className="mb-4 text-xl font-semibold">
                AI Assistant
            </h2>

            <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask anything about this notebook..."
                className="min-h-[120px] w-full rounded-md border p-3"
            />

            <Button
                className="mt-4"
                onClick={askQuestion}
                disabled={loading}
            >
                {loading ? "Thinking..." : "Ask AI"}
            </Button>

            {answer && (
                <div className="mt-6 rounded-lg border bg-slate-50 p-4">
                    <h3 className="mb-2 font-semibold">Answer</h3>
                    <p className="whitespace-pre-wrap">{answer.answer}</p>
                    {answer.sources?.length > 0 && (
                        <div className="mt-5 border-t pt-4 text-sm">
                            <p>
                                <strong>Source:</strong>{" "}
                                {answer.sources[0].payload.lesson
                                    ?.replace("_epm", "")
                                    .replace(/_/g, " ")
                                    .replace(/-/g, " ")}
                            </p>

                            {typeof answer.sources[0].payload.start === "string" ? (
                                <p>
                                    <strong>Timestamp:</strong>{" "}
                                    {answer.sources[0].payload.start
                                        .replace(",", ".")
                                        .split(".")[0]
                                        .substring(3)}
                                    {" - "}
                                    {answer.sources[0].payload.end
                                        .replace(",", ".")
                                        .split(".")[0]
                                        .substring(3)}
                                </p>
                            ) : (
                                <p>
                                    <strong>Page:</strong> {answer.sources[0].payload.page ?? 1}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}