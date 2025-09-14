import AquaWindow from './components/ui/AquaWindow';
import CardShop from './components/CardShop';

export default function Home() {
  return (
    <div className="min-h-screen py-10" style={{background: 'linear-gradient(135deg, #e3edf7 0%, #c7d2e7 100%)'}}>
      <div className="container mx-auto px-4">
        <AquaWindow
          title="WARLOK Card Shop"
          toolbar={null}
          sidebar={null}
          className="mx-auto max-w-[1400px]"
        >
          <CardShop />
        </AquaWindow>
      </div>
    </div>
  );
}
