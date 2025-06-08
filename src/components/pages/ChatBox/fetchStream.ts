export const fetchStream = async (
  url: string,
  payload: any,
  onData: (text: string) => void,
  options?: {
    token?: string;
    onError?: (error: Error) => void;
    signal?: AbortSignal;
  }
) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(options?.token ? { Authorization: `Bearer ${options.token}` } : {}),
      },
      body: JSON.stringify(payload),
      signal: options?.signal,
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    if (!response.body) throw new Error("ReadableStream not available");

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const cleanLine = line.replace(/^data:\s*/, "").trim();
          if (cleanLine) {
            console.log("check lllll ", cleanLine);
            onData(cleanLine);
          }
        }
      }

      if (buffer.trim()) {
        const cleanLine = buffer.replace(/^data:\s*/, "").trim();
        if (cleanLine) {
          onData(cleanLine);
        }
      }
    } finally {
      reader.releaseLock();
    }
  } catch (error) {
    if (options?.onError) {
      options.onError(
        error instanceof Error ? error : new Error(String(error))
      );
    }
  }
};
