// Define a type for the props
type AdminLeftPanelProps = {
  toggleContent: (contentName: string) => void;
  content: string;
};

export default function AdminLeftPanel({
  toggleContent,
  content,
}: AdminLeftPanelProps) {
  return (
    <div className="">
      <h2>Left panel</h2>
    </div>
  );
}
