import UsersSection from "../components/users_section/Users.section";
import TypingSection from "../components/typing_section/Typing.section";
import ToolsSection from "../components/tools_section/Tools.section";

const ChatPage = () => {
  return (
    <div className="box">
      <UsersSection />
      <TypingSection />
      <ToolsSection />
    </div>
  );
};

export default ChatPage;
