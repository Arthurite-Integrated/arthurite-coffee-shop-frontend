import Header from "../../../components/Header";
import Link from "next/link";

export default function VendorDashboard() {
  // This data would come from your API in a real application
  const dashboardData = {
    totalOrders: 150,
    pendingOrders: 10,
    completedOrders: 140,
    earnings: 2500,
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-[#19381f] mb-8">
          Vendor Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard
            title="Total Orders"
            value={dashboardData.totalOrders}
          />
          <DashboardCard
            title="Pending Orders"
            value={dashboardData.pendingOrders}
          />
          <DashboardCard
            title="Completed Orders"
            value={dashboardData.completedOrders}
          />
          <DashboardCard
            title="Earnings"
            value={`$${dashboardData.earnings}`}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/vendor/orders"
            className="bg-[#19381f] text-white p-4 rounded text-center hover:bg-[#19381f]/80"
          >
            Manage Orders
          </Link>
          <Link
            href="/vendor/menu"
            className="bg-[#19381f] text-white p-4 rounded text-center hover:bg-[#19381f]/80"
          >
            Manage Menu
          </Link>
          <Link
            href="/vendor/account"
            className="bg-[#19381f] text-white p-4 rounded text-center hover:bg-[#19381f]/80"
          >
            Account Settings
          </Link>
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ title, value }) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-3xl font-bold text-[#19381f]">{value}</p>
    </div>
  );
}
