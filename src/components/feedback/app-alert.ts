import { InteractionManager } from "react-native";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";

function safeDialogShow(config: Parameters<typeof Dialog.show>[0]) {
  InteractionManager.runAfterInteractions(() => {
    requestAnimationFrame(() => {
      try {
        Dialog.show(config);
      } catch (error) {
        console.warn("Falha ao exibir dialog", error);
      }
    });
  });
}

function safeDialogHide() {
  try {
    Dialog.hide();
  } catch (error) {
    console.warn("Falha ao fechar dialog", error);
  }
}

export function confirmDelete(
  title: string,
  message: string,
  onConfirm: () => void,
) {
  safeDialogShow({
    type: ALERT_TYPE.WARNING,
    title,
    textBody: message,
    button: "Excluir",
    closeOnOverlayTap: true,
    onPressButton: () => {
      safeDialogHide();

      setTimeout(() => {
        try {
          onConfirm();
        } catch (error) {
          console.warn("Falha ao executar confirmação", error);
        }
      }, 180);
    },
  });
}

export function showSuccess(message: string) {
  safeDialogShow({
    type: ALERT_TYPE.SUCCESS,
    title: "Sucesso",
    textBody: message,
    button: "OK",
    onPressButton: () => {
      safeDialogHide();
    },
  });
}

export function showError(message: string) {
  safeDialogShow({
    type: ALERT_TYPE.DANGER,
    title: "Erro",
    textBody: message,
    button: "OK",
    onPressButton: () => {
      safeDialogHide();
    },
  });
}
