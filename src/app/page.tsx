import { Button } from "@/components/ui/button";
import { ModeToggle } from "../components/ModeToggle";

export default function HomePage() {
  return (
    <section>
      <div>
        <Button>Click me</Button>
        <ModeToggle />
      </div>
    </section>
  );
}
