type Metrics = {
  budget: string;
  current_usage: string;
  upcoming_usage: string;
  total_estimation: string;
  usage_percent: number;
  contacts: number;
  broadcasts: number;
};

async function getMetrics(): Promise<Metrics> {
  const backendUrl = process.env.API_URL || "http://backend:8080";
  try {
    const res = await fetch(`${backendUrl}/api/dashboard`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch");
    return await res.json();
  } catch (err) {
    return {
      budget: "Rp1,000,004",
      current_usage: "Rp73,263.59",
      upcoming_usage: "Rp0",
      total_estimation: "Rp73,263.59",
      usage_percent: 7,
      contacts: 21637,
      broadcasts: 276,
    };
  }
}

export default async function DashboardPage() {
  const data = await getMetrics();

  return (
    <div className="flex min-h-screen bg-[#141416]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1b1c1e] border-r border-[#26282b] flex flex-col justify-between p-4">
        <div>
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="w-8 h-8 rounded bg-gradient-to-tr from-green-600 to-green-400 flex items-center justify-center font-bold text-lg text-black">
              K
            </div>
            <div>
              <div className="font-semibold text-sm">Kouvénta Portal</div>
              <div className="text-xs text-gray-500">Version 2.4 (demo test)</div>
            </div>
          </div>

          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">
            Main Menu
          </div>
          <nav className="space-y-1">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#22c55e] text-black font-medium text-sm cursor-pointer">
              <span>●</span> Main Dashboard
            </div>
            {["Agent", "Broadcast", "Follow Up Template", "CSAT", "Chat Tag"].map((item) => (
              <div key={item} className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-[#26282b] hover:text-white text-sm cursor-pointer">
                <span>○</span> {item}
              </div>
            ))}
          </nav>
        </div>

        <div className="text-[11px] text-gray-500 border-t border-[#26282b] pt-3">
          Copyright © 2026: PT Helios Informatika Nusantara
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 space-y-6">
        <header className="flex justify-between items-center pb-4 border-b border-[#26282b]">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <div className="flex items-center gap-3 text-sm">
            <span className="bg-[#26282b] px-3 py-1.5 rounded-full text-green-400 text-xs">● Live Data</span>
            <div className="w-8 h-8 rounded-full bg-green-700 text-white font-bold flex items-center justify-center text-xs">
              HE
            </div>
          </div>
        </header>

        {/* Budget Overview Card */}
        <div className="bg-[#1b1c1e] border border-[#26282b] rounded-xl p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-300">Budget Estimation Overview</h2>
          <div className="grid grid-cols-2 gap-6 items-center">
            <div className="text-xs space-y-1 text-gray-400">
              <div className="flex justify-between"><span>Budget</span> <span className="text-white font-medium">: {data.budget}</span></div>
              <div className="flex justify-between"><span>Current Usage</span> <span className="text-white font-medium">: {data.current_usage}</span></div>
              <div className="flex justify-between"><span>Upcoming Usage</span> <span className="text-white font-medium">: {data.upcoming_usage}</span></div>
              <div className="flex justify-between border-t border-[#26282b] pt-1"><span>Total Estimation</span> <span className="text-white font-semibold">: {data.total_estimation}</span></div>
            </div>
            
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="w-full bg-[#26282b] h-4 rounded-full overflow-hidden flex">
                <div style={{ width: `${data.usage_percent}%` }} className="bg-[#22c55e] h-full"></div>
              </div>
              <div className="text-[11px] text-gray-400 flex justify-between">
                <span>0 ({data.usage_percent}%)</span>
                <span>{data.budget}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-[#1b1c1e] border border-[#26282b] rounded-xl p-6">
            <div className="text-xs text-gray-400 mb-1">Contact</div>
            <div className="text-3xl font-bold text-white">{data.contacts.toLocaleString()}</div>
            <div className="text-[11px] text-gray-500 mt-2">Added Today: 0</div>
          </div>

          <div className="bg-[#1b1c1e] border border-[#26282b] rounded-xl p-6">
            <div className="text-xs text-gray-400 mb-1">Broadcast</div>
            <div className="text-3xl font-bold text-white">{data.broadcasts.toLocaleString()}</div>
            <div className="text-[11px] text-gray-500 mt-2">Upcoming: 0</div>
          </div>
        </div>
      </main>
    </div>
  );
}