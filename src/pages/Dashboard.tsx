import Sidebar from '../components/UserDashboard/Sidebar';
import TopBar from '../components/UserDashboard/TopBar';
import HeroBanner from '../components/UserDashboard/HeroBanner';
import PipelineTable from '../components/UserDashboard/PipelineTable';
import QuickSpin from '../components/UserDashboard/QuickSpin';
import SystemLog from '../components/UserDashboard/SystemLog';
import DistributionFidelity from '../components/UserDashboard/DistributionFidelity';

export default function Dashboard() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#060606]">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <TopBar />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-5 max-w-none">
            <HeroBanner />
            <PipelineTable />
            <div className="grid grid-cols-[1fr_340px] gap-5">
              <QuickSpin />
              <SystemLog />
            </div>
            <DistributionFidelity />
          </div>
        </main>
      </div>
    </div>
  );
}
