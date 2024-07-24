import { useToast } from "primevue/usetoast";

const toast = useToast();

const toastMessage = (severity, code, message) => {
  console.log("masuk");
  toast.add({
    severity,
    summary: code,
    detail: message,
    life: 10000,
  });
};

export default toastMessage;
