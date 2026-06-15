import { createBrowserRouter, RouterProvider, NavLink, Outlet } from 'react-router';
import { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  useIsMobile,
  useAnalyticsQuery,
  Skeleton,
} from '@databricks/appkit-ui/react';
import { Menu, Activity, Building2, Users, Heart } from 'lucide-react';
import { AnalyticsPage } from './pages/analytics/AnalyticsPage';
import { GeniePage } from './pages/genie/GeniePage';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
    isActive
      ? 'bg-primary text-primary-foreground'
      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
  }`;

const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  `block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
    isActive
      ? 'bg-primary text-primary-foreground'
      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
  }`;

type NavLinkClassFn = (props: { isActive: boolean }) => string;

function NavLinks({ className, linkClass, onClick }: { className?: string; linkClass: NavLinkClassFn; onClick?: () => void }) {
  return (
    <nav className={className}>
      <NavLink to="/" end className={linkClass} onClick={onClick}>
        Home
      </NavLink>
      <NavLink to="/analytics" className={linkClass} onClick={onClick}>
        Analytics
      </NavLink>
      <NavLink to="/genie" className={linkClass} onClick={onClick}>
        Genie
      </NavLink>
    </nav>
  );
}

function Layout() {
  const isMobile = useIsMobile();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    if (!isMobile) setMobileNavOpen(false);
  }, [isMobile]);

  return (
    <div className="min-h-screen bg-[#F9F7F4] flex flex-col">
      <header className="border-b bg-white px-4 md:px-6 py-3 flex items-center gap-4 shadow-sm">
        <div className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-[#FF3621]" />
          <h1 className="text-lg font-semibold text-[#0B2026]">Healthcare Facility Insights</h1>
        </div>
        <NavLinks className="hidden md:flex gap-1" linkClass={navLinkClass} />
        <div className="ml-auto md:hidden">
          <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
            <Button variant="ghost" size="icon" onClick={() => setMobileNavOpen(true)}>
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open navigation</span>
            </Button>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>
              <NavLinks className="flex flex-col gap-1" linkClass={mobileNavLinkClass} onClick={() => setMobileNavOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/analytics', element: <AnalyticsPage /> },
      { path: '/genie', element: <GeniePage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

function HomePage() {
  const { data: facilityStats, loading: facilityLoading } = useAnalyticsQuery('facility_stats');
  const { data: healthStats, loading: healthLoading } = useAnalyticsQuery('district_health_summary');

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-bold text-[#0B2026]">
          Healthcare Facility Analytics
        </h2>
        <p className="text-lg text-muted-foreground">
          Explore healthcare facilities and district health indicators across India
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-lg hover:shadow-xl transition-shadow border-t-4 border-t-[#FF3621]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Facilities</CardTitle>
              <Building2 className="h-5 w-5 text-[#FF3621]" />
            </div>
          </CardHeader>
          <CardContent>
            {facilityLoading ? (
              <Skeleton className="h-10 w-24" />
            ) : (
              <div>
                <div className="text-3xl font-bold text-[#FF3621]">
                  {facilityStats?.[0]?.total_facilities?.toLocaleString() || '—'}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Across {facilityStats?.[0]?.states_covered || '—'} states
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow border-t-4 border-t-blue-600">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Districts Surveyed</CardTitle>
              <Users className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            {healthLoading ? (
              <Skeleton className="h-10 w-24" />
            ) : (
              <div>
                <div className="text-3xl font-bold text-blue-600">
                  {healthStats?.[0]?.total_districts?.toLocaleString() || '—'}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  In {healthStats?.[0]?.total_states || '—'} states/UTs
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow border-t-4 border-t-green-600">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Health Insurance</CardTitle>
              <Heart className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            {healthLoading ? (
              <Skeleton className="h-10 w-24" />
            ) : (
              <div>
                <div className="text-3xl font-bold text-green-600">
                  {healthStats?.[0]?.avg_health_insurance || '—'}%
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Average coverage
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow border-t-4 border-t-purple-600">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Female Literacy</CardTitle>
              <Activity className="h-5 w-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            {healthLoading ? (
              <Skeleton className="h-10 w-24" />
            ) : (
              <div>
                <div className="text-3xl font-bold text-purple-600">
                  {healthStats?.[0]?.avg_female_literacy || '—'}%
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Women 15-49 years
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-[#0B2026]">Explore with Analytics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              View detailed visualizations of facility distribution and health indicators across states and districts.
            </p>
            <Button asChild className="bg-[#FF3621] hover:bg-[#E52F1A]">
              <NavLink to="/analytics">View Analytics Dashboard →</NavLink>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-[#0B2026]">Ask Genie</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Use natural language to explore your healthcare data. Ask questions like "Which states have the highest health insurance coverage?"
            </p>
            <Button asChild variant="outline" className="border-[#FF3621] text-[#FF3621] hover:bg-[#FF3621] hover:text-white">
              <NavLink to="/genie">Ask Genie →</NavLink>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
