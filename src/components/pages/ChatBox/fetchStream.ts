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
    const decoder = new TextDecoder("utf-8");
    let buffer = "";

    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        // Thêm phần mới vào buffer và giải mã
        buffer += decoder.decode(value, { stream: true });

        // Xử lý các dòng hoàn chỉnh
        let lineEndIndex;
        while ((lineEndIndex = buffer.indexOf("\n")) >= 0) {
          const line = buffer.substring(0, lineEndIndex).trimEnd();
          buffer = buffer.substring(lineEndIndex + 1);

          // Xử lý tất cả các dòng, kể cả dòng chỉ chứa khoảng trắng
          const cleanLine = line.replace(/^data:\s*/, "");
          onData(cleanLine);
        }
      }

      // Xử lý phần còn lại trong buffer khi stream kết thúc
      if (buffer) {
        const cleanLine = buffer.replace(/^data:\s*/, "");
        onData(cleanLine);
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
