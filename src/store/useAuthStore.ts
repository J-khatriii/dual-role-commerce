import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Account, Role } from "@/types";

const DEMO_ACCOUNTS: Record<Role, Account> = {
  customer: { id: "acc_customer_1", role: "customer", name: "Anant Verma", avatarColor: "#6366F1" },
  supplier: { id: "acc_supplier_1", role: "supplier", name: "Rohan Traders", avatarColor: "#F59E0B" },
}

interface AuthState {
  activeAccount: Account | null;
  hasHydrated: boolean;
  signIn: (role: Role) => void;
  switchRole: (role: Role) => void;
  signOut: () => void;
  setHasHydrated: (v: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      activeAccount: null,
      hasHydrated: false,
      signIn: (role) => set({ activeAccount: DEMO_ACCOUNTS[role] }),
      switchRole: (role) => set({ activeAccount: DEMO_ACCOUNTS[role] }),
      signOut: () => set({ activeAccount: null }),
      setHasHydrated: (v) => set({ hasHydrated: v }),
    }),
    {
      name: "dual-role-commerce/auth",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ activeAccount: state.activeAccount }),
      onRehydrateStorage: () => (state) => state?.setHasHydrated(true),
    }
  )
);
