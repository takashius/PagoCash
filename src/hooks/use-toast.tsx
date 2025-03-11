import React, { createContext, useContext, useReducer, useRef, useEffect } from "react";
import { Animated, Text, TouchableOpacity, View, StyleSheet } from "react-native";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 3000; // Reducido para demostración en móviles

// Definición del estado y acciones
type Toast = {
  id: string;
  title?: string;
  description?: string;
  duration?: number; // Duración opcional
};

type State = {
  toasts: Toast[];
};

type Action =
  | { type: "ADD_TOAST"; toast: Toast }
  | { type: "REMOVE_TOAST"; id: string };

// Reducer para manejar el estado
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };
    case "REMOVE_TOAST":
      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== action.id),
      };
    default:
      return state;
  }
};

// Contexto de Toast
const ToastContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | null>(null);

// Proveedor del contexto
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, { toasts: [] });

  return (
    <ToastContext.Provider value={{ state, dispatch }}>
      {children}
      <ToastContainer toasts={state.toasts} />
    </ToastContext.Provider>
  );
};

// Hook para usar el Toast
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  const { dispatch } = context;

  const toast = (toast: Omit<Toast, "id">) => {
    const id = Date.now().toString();
    dispatch({
      type: "ADD_TOAST",
      toast: { ...toast, id },
    });

    // Remover automáticamente después de un tiempo
    setTimeout(() => {
      dispatch({ type: "REMOVE_TOAST", id });
    }, toast.duration || TOAST_REMOVE_DELAY);
  };

  return { toast };
};

// Contenedor de los Toasts
const ToastContainer: React.FC<{ toasts: Toast[] }> = ({ toasts }) => {
  return (
    <View style={styles.toastContainer}>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </View>
  );
};

// Componente individual del Toast
const ToastItem: React.FC<{ toast: Toast }> = ({ toast }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    return () => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    };
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.toast, { opacity: fadeAnim }]}>
      <Text style={styles.toastTitle}>{toast.title}</Text>
      {toast.description && (
        <Text style={styles.toastDescription}>{toast.description}</Text>
      )}
    </Animated.View>
  );
};

// Estilos para el sistema de Toasts
const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: "center",
  },
  toast: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Sombra para Android
  },
  toastTitle: {
    color: "#fff",
    fontWeight: "bold",
  },
  toastDescription: {
    color: "#fff",
    marginTop: 5,
  },
});
