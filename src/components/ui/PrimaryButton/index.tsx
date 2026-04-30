import { Button, ButtonText } from "@/components/ui/button";

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
};

export function PrimaryButton({ label, onPress }: PrimaryButtonProps) {
  return (
    <Button onPress={onPress} size="lg" className="w-full">
      <ButtonText>{label}</ButtonText>
    </Button>
  );
}
