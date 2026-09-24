import { RoleHeader } from "@/components/RoleHeader";
import { colors } from "@/constants/theme";
import { ChatThread } from "@/screens/ChatThread";
import { SafeAreaView } from "react-native-safe-area-context";

const ChatScreen = () => (
  <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }} edges={["top"]}>
    <RoleHeader title="Chat" />
    <ChatThread />
  </SafeAreaView>
);

export default ChatScreen;
