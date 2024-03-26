import { useRouter } from "next/navigation";

const useNavigateTo = () => {
  const router = useRouter();

  const navigateToWithViewTransition = (to: string) => {
    const document = window.document as any;
    if (!document.startViewTransition) {
      router.push(to);
    } else {
      document.startViewTransition(() => {
        router.push(to);
      });
    }
  };

  return navigateToWithViewTransition;
};

export default useNavigateTo;
