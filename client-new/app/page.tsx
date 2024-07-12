import { ChatWindow } from "../app/components/ChatWindow";
import { ToastContainer } from "react-toastify";

export default function Home() {
  return (
    <>
      <ToastContainer />
      <ChatWindow
        apiBaseUrl={process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000"}
        titleText="AI Assistant"
        placeholder="What is LangChain Expression Language?"
      ></ChatWindow>
    </>
  );
}
