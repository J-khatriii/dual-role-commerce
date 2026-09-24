import { colors } from "@/constants/theme";
import { useAuthStore } from "@/store/useAuthStore";
import { FlashList } from "@shopify/flash-list";
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { api } from "../../convex/_generated/api";

const THREAD_ID = "customer-supplier-main";

export const ChatThread = () => {
  const account = useAuthStore((state) => state.activeAccount);
  const messages = useQuery(api.messages.list, { threadId: THREAD_ID });
  const sendMessage = useMutation(api.messages.send);
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim() || !account) return;
    sendMessage({
      threadId: THREAD_ID,
      senderRole: account.role,
      senderName: account.name,
      text: text.trim(),
    });
    setText("");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <FlashList
        data={messages ? [...messages].reverse() : []}
        inverted
        keyExtractor={(item) => item._id}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const isMine = item.senderRole === account?.role;
          return (
            <View
              style={[
                styles.bubble,
                isMine ? styles.bubbleMine : styles.bubbleTheirs,
              ]}
            >
              <Text style={styles.sender}>{item.senderName}</Text>
              <Text style={styles.text}>{item.text}</Text>
            </View>
          );
        }}
      />
      <View style={styles.inputRow}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Type a message..."
          placeholderTextColor={colors.textMuted}
          style={styles.input}
          multiline
        />
        <Pressable onPress={handleSend} style={styles.sendButton}>
          <Text style={styles.sendText}>Send</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  listContent: { padding: 12, paddingBottom: 20 },
  bubble: { maxWidth: "75%", borderRadius: 16, padding: 10, marginBottom: 8 },
  bubbleMine: { backgroundColor: colors.chatBubbleMine, alignSelf: "flex-end" },
  bubbleTheirs: {
    backgroundColor: colors.chatBubbleTheirs,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: colors.border,
  },
  sender: {
    fontSize: 10,
    color: colors.textSecondary,
    marginBottom: 2,
    fontWeight: "600",
  },
  text: { fontSize: 14, color: colors.textPrimary },
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: Platform.OS === "android" ? 12 : 8,
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.bg,
  },
  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 120,
    backgroundColor: colors.bgElevated,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: colors.border,
    textAlignVertical: "center",
  },
  sendButton: {
    backgroundColor: colors.brand,
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: "center",
    minHeight: 44,
  },
  sendText: { color: "#FFFFFF", fontWeight: "700" },
});
