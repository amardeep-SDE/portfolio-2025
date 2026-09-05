/**
 * Global WhatsApp Interactive Modal Helper
 * Triggers the floating WhatsApp chat popover dialog from anywhere in the application.
 */
export const openWhatsAppModal = (customMessage = "") => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("open-whatsapp-modal", {
        detail: { message: customMessage },
      })
    );
  }
};
